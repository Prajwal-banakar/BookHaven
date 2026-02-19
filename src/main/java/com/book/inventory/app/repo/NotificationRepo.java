package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepo extends MongoRepository<Notification, String> {
    List<Notification> findByUsernameOrderByTimestampDesc(String username);
    long countByUsernameAndReadFalse(String username);
}