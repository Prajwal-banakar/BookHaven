package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Order;
import com.book.inventory.app.domain.Cart;
import com.book.inventory.app.domain.CartItem;
import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.OrderRepo;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderRestController {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private BookRepo bookRepo;
    
    @Autowired
    private CartRepo cartRepo;

    // Checkout from Cart
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Order paymentDetails) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        Cart cart = cartRepo.findByUsername(username);
        if (cart == null || cart.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        // Validate Stock
        for (CartItem item : cart.getItems()) {
            Book book = bookRepo.findByBookid(item.getBookId());
            if (book == null || Integer.parseInt(book.getQuantity()) < item.getQuantity()) {
                return ResponseEntity.badRequest().body("Not enough stock for: " + item.getTitle());
            }
        }

        // Deduct Stock
        for (CartItem item : cart.getItems()) {
            Book book = bookRepo.findByBookid(item.getBookId());
            int newQuantity = Integer.parseInt(book.getQuantity()) - item.getQuantity();
            book.setQuantity(String.valueOf(newQuantity));
            bookRepo.save(book);
        }

        // Create Order
        Order order = new Order();
        order.setUsername(username);
        order.setItems(cart.getItems());
        order.setTotalPrice(cart.getTotalPrice());
        order.setStatus("PENDING"); // Changed from APPROVED to PENDING
        order.setOrderDate(LocalDateTime.now());
        order.setPaymentMethod(paymentDetails.getPaymentMethod());
        order.setTransactionId(UUID.randomUUID().toString());

        orderRepo.save(order);

        // Clear Cart
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepo.save(cart);

        return ResponseEntity.ok(order);
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