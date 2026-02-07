package com.book.inventory.app.controller;

import com.book.inventory.app.domain.User;
import com.book.inventory.app.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthRestController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestParam("username") String username, 
                                          @RequestParam("password") String password) {
        if (userRepo.findByUsername(username) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }
}