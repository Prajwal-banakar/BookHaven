package com.book.inventory.app.controller;

import com.book.inventory.app.domain.ContactMessage;
import com.book.inventory.app.repo.ContactMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactRestController {

    @Autowired
    private ContactMessageRepo contactRepo;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {
        message.setTimestamp(LocalDateTime.now());
        contactRepo.save(message);
        return ResponseEntity.ok("Message sent successfully");
    }

    // Admin: View all messages
    @GetMapping("/all")
    public List<ContactMessage> getAllMessages() {
        return contactRepo.findAll();
    }
}