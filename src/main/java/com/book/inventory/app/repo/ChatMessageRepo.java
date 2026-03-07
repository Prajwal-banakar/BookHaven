package com.book.inventory.app.repo;

import com.book.inventory.app.domain.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatMessageRepo extends MongoRepository<ChatMessage, String> {
    // Find messages between a user and another user/admin
    List<ChatMessage> findByFromUserAndToUserOrFromUserAndToUserOrderByTimestampAsc(
        String from1, String to1, String from2, String to2
    );

    // Find all messages where 'admin' is either the sender or receiver
    List<ChatMessage> findByFromUserOrToUserOrderByTimestampAsc(String from, String to);
}