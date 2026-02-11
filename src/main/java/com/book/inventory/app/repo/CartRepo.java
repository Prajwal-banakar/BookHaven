package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepo extends MongoRepository<Cart, String> {
    Cart findByUsername(String username);
}