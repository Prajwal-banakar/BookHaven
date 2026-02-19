package com.book.inventory.app.repo;

import com.book.inventory.app.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    User findByUsername(String username);
    List<User> findByRole(String role);
}