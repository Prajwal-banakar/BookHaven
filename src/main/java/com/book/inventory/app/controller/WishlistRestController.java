package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Wishlist;
import com.book.inventory.app.repo.WishlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class WishlistRestController {

    @Autowired
    private WishlistRepo wishlistRepo;

    @GetMapping
    public ResponseEntity<Wishlist> getWishlist(@AuthenticationPrincipal UserDetails userDetails) {
        // Return an existing wishlist or a new, empty one if not found.
        Wishlist wishlist = wishlistRepo.findByUserId(userDetails.getUsername())
                .orElse(new Wishlist(null, userDetails.getUsername(), new ArrayList<>()));
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<Wishlist> addBookToWishlist(@PathVariable String bookId, @AuthenticationPrincipal UserDetails userDetails) {
        // Find the user's wishlist or create a new one with a mutable list.
        Wishlist wishlist = wishlistRepo.findByUserId(userDetails.getUsername())
                .orElse(new Wishlist(null, userDetails.getUsername(), new ArrayList<>()));
        
        // Add the book if it's not already present.
        if (!wishlist.getBookIds().contains(bookId)) {
            wishlist.getBookIds().add(bookId);
            wishlistRepo.save(wishlist);
        }
        return ResponseEntity.ok(wishlist);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Wishlist> removeBookFromWishlist(@PathVariable String bookId, @AuthenticationPrincipal UserDetails userDetails) {
        // Find the user's wishlist or create a new one to avoid errors, though removal implies it should exist.
        Wishlist wishlist = wishlistRepo.findByUserId(userDetails.getUsername())
                .orElse(new Wishlist(null, userDetails.getUsername(), new ArrayList<>()));
        
        // Remove the book ID.
        wishlist.getBookIds().remove(bookId);
        wishlistRepo.save(wishlist);

        return ResponseEntity.ok(wishlist);
    }
}