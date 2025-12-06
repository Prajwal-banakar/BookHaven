package com.book.inventory.app.repo;

import com.book.inventory.app.domain.BookRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRequestRepo extends MongoRepository<BookRequest, String> {
}
