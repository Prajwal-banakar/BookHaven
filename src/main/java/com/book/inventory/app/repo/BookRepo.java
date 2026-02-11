package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepo extends MongoRepository<Book, String> {
    Book findByBookid(String bookid);
    List<Book> findByTitleContainingIgnoreCase(String title);
}