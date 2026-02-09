package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Order;
import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.OrderRepo;
import com.book.inventory.app.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderRestController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private BookRepo bookRepo;

    // User: Place an order
    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody Order orderRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Book book = bookRepo.findByBookid(orderRequest.getBookId());
        if (book == null) {
            return ResponseEntity.badRequest().body("Book not found");
        }
        if (Integer.parseInt(book.getQuantity()) <= 0) {
            return ResponseEntity.badRequest().body("Book out of stock");
        }

        // Create Order
        Order order = new Order();
        order.setBookId(book.getBookid());
        order.setBookTitle(book.getTitle());
        order.setUsername(username);
        order.setPrice(book.getPrice());
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());
        
        // Decrease quantity
        int newQuantity = Integer.parseInt(book.getQuantity()) - 1;
        book.setQuantity(String.valueOf(newQuantity));
        bookRepo.save(book);

        orderRepo.save(order);
        return ResponseEntity.ok("Order placed successfully");
    }

    // User: Get my orders
    @GetMapping("/my-orders")
    public List<Order> getMyOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return orderRepo.findByUsername(auth.getName());
    }

    // Admin: Get all orders
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    // Admin: Update order status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestParam String status) {
        return orderRepo.findById(id).map(order -> {
            order.setStatus(status);
            orderRepo.save(order);
            return ResponseEntity.ok("Status updated");
        }).orElse(ResponseEntity.notFound().build());
    }
}