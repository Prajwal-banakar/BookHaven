package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishlistRepo extends MongoRepository<Wishlist, String> {
    Optional<Wishlist> findByUserId(String userId);
}
