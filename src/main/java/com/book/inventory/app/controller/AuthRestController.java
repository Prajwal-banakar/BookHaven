package com.book.inventory.app.controller;

import com.book.inventory.app.domain.User;
import com.book.inventory.app.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
                                          @RequestParam("password") String password,
                                          @RequestParam("fullName") String fullName,
                                          @RequestParam("email") String email,
                                          @RequestParam("phoneNumber") String phoneNumber,
                                          @RequestParam("address") String address) {
        if (userRepo.findByUsername(username) != null) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("USER");
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setAddress(address);
        userRepo.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/api/auth/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByUsername(username);
        if (user != null) {
            // Avoid sending password back
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
}