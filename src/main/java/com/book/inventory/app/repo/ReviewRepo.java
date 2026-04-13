package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepo extends MongoRepository<Review, String> {
    List<Review> findByBookId(String bookId);
    List<Review> findByUsername(String username);
}