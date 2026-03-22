package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Review;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewRestController {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private BookRepo bookRepo;

    @GetMapping("/{bookId}")
    public List<Review> getReviewsForBook(@PathVariable String bookId) {
        return reviewRepo.findByBookId(bookId);
    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody Review review) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        review.setUsername(auth.getName());
        review.setTimestamp(LocalDateTime.now());
        reviewRepo.save(review);

        // Update the book's average rating
        Book book = bookRepo.findByBookid(review.getBookId());
        if (book != null) {
            List<Review> reviews = reviewRepo.findByBookId(review.getBookId());
            double average = reviews.stream()
                                    .mapToInt(Review::getRating)
                                    .average()
                                    .orElse(0.0);
            book.setAverageRating(average);
            book.setReviewCount(reviews.size());
            bookRepo.save(book);
        }

        return ResponseEntity.ok(review);
    }
}