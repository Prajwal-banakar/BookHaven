package com.book.inventory.app.service;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private BookRepo bookRepo;

    public List<Book> getPopularBooks(int limit) {
        // For simplicity, popular books are those with the highest average rating,
        // then by review count, then by publication year.
        // In a real scenario, this would involve more complex algorithms.
        return bookRepo.findAll(Sort.by(Sort.Direction.DESC, "averageRating", "reviewCount", "publicationYear"))
                       .stream()
                       .limit(limit)
                       .toList();
    }

    // We can add more sophisticated recommendation methods here later,
    // e.g., based on user's purchase history, wishlist, or collaborative filtering.
}
