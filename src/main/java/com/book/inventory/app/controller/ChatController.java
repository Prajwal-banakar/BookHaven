package com.book.inventory.app.controller;

import com.book.inventory.app.domain.ChatMessage;
import com.book.inventory.app.domain.Notification;
import com.book.inventory.app.repo.ChatMessageRepo;
import com.book.inventory.app.repo.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatMessageRepo chatRepo;

    @Autowired
    private NotificationRepo notificationRepo;

    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage, Principal principal) {
        chatMessage.setFromUser(principal.getName());
        chatMessage.setTimestamp(LocalDateTime.now());
        chatRepo.save(chatMessage);

        // Send to the recipient's private queue
        messagingTemplate.convertAndSendToUser(
            chatMessage.getToUser(),
            "/queue/messages",
            chatMessage
        );
        
        // Also send back to the sender to confirm it was sent
        messagingTemplate.convertAndSendToUser(
            principal.getName(),
            "/queue/messages",
            chatMessage
        );

        // Create a notification for the recipient
        Notification notification = new Notification();
        notification.setUsername(chatMessage.getToUser());
        notification.setMessage("New message from " + principal.getName());
        notification.setType("INFO");
        notification.setRead(false);
        notification.setTimestamp(LocalDateTime.now());
        notificationRepo.save(notification);
    }
}

@RestController
class ChatHistoryController {
    @Autowired
    private ChatMessageRepo chatRepo;

    // Get chat history between current user and another user/admin
    @GetMapping("/api/chat/history/{otherUser}")
    public List<ChatMessage> getChatHistory(@PathVariable String otherUser, Principal principal) {
        return chatRepo.findByFromUserAndToUserOrFromUserAndToUserOrderByTimestampAsc(
            principal.getName(), otherUser, otherUser, principal.getName()
        );
    }

    // Admin: Get a list of users who have sent messages to admin
    @GetMapping("/api/chat/users")
    public List<String> getChatUsers() {
        List<ChatMessage> messages = chatRepo.findByFromUserOrToUserOrderByTimestampAsc("admin", "admin");
        return messages.stream()
                .flatMap(msg -> Stream.of(msg.getFromUser(), msg.getToUser()))
                .filter(name -> name != null && !name.equals("admin"))
                .distinct()
                .collect(Collectors.toList());
    }
}