package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Notification;
import com.book.inventory.app.repo.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationRestController {

    @Autowired
    private NotificationRepo notificationRepo;

    @GetMapping
    public List<Notification> getMyNotifications() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return notificationRepo.findByUsernameOrderByTimestampDesc(auth.getName());
    }

    @GetMapping("/unread-count")
    public long getUnreadCount() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return notificationRepo.countByUsernameAndReadFalse(auth.getName());
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable String id) {
        return notificationRepo.findById(id).map(notification -> {
            notification.setRead(true);
            notificationRepo.save(notification);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/read-all")
    public ResponseEntity<?> markAllAsRead() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        List<Notification> notifications = notificationRepo.findByUsernameOrderByTimestampDesc(auth.getName());
        notifications.forEach(n -> {
            n.setRead(true);
            notificationRepo.save(n);
        });
        return ResponseEntity.ok().build();
    }
}