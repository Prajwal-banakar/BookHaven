package com.book.inventory.app.repo;

import com.book.inventory.app.domain.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepo extends MongoRepository<ContactMessage, String> {
}