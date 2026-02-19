package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Order;
import com.book.inventory.app.domain.Cart;
import com.book.inventory.app.domain.CartItem;
import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Notification;
import com.book.inventory.app.domain.User;
import com.book.inventory.app.repo.OrderRepo;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.CartRepo;
import com.book.inventory.app.repo.NotificationRepo;
import com.book.inventory.app.repo.UserRepo;
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
    
    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private UserRepo userRepo;

    // Checkout from Cart
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Order paymentDetails) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        Cart cart = cartRepo.findByUsername(username);
        if (cart == null || cart.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty");
        }

        // Create Order (PENDING)
        Order order = new Order();
        order.setUsername(username);
        order.setItems(cart.getItems());
        order.setTotalPrice(cart.getTotalPrice());
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());
        order.setPaymentMethod(paymentDetails.getPaymentMethod());
        order.setShippingAddress(paymentDetails.getShippingAddress());
        order.setTransactionId(UUID.randomUUID().toString());

        orderRepo.save(order);

        // Clear Cart
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepo.save(cart);

        // Notify Admins
        List<User> admins = userRepo.findByRole("ADMIN");
        for (User admin : admins) {
            Notification notification = new Notification();
            notification.setUsername(admin.getUsername());
            notification.setMessage("New Order #" + order.getId().substring(0, 8) + " placed by " + username);
            notification.setType("INFO");
            notification.setRead(false);
            notification.setTimestamp(LocalDateTime.now());
            notificationRepo.save(notification);
        }

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
            // If approving, check and deduct stock
            if ("APPROVED".equals(status) && !"APPROVED".equals(order.getStatus())) {
                for (CartItem item : order.getItems()) {
                    Book book = bookRepo.findByBookid(item.getBookId());
                    if (book == null) {
                        return ResponseEntity.badRequest().body("Book not found: " + item.getTitle());
                    }
                    int currentStock = Integer.parseInt(book.getQuantity());
                    if (currentStock < item.getQuantity()) {
                        return ResponseEntity.badRequest().body("Not enough stock for: " + item.getTitle());
                    }
                    // Deduct stock
                    book.setQuantity(String.valueOf(currentStock - item.getQuantity()));
                    bookRepo.save(book);
                }
            }
            
            order.setStatus(status);
            orderRepo.save(order);
            
            // Send Notification to User
            Notification notification = new Notification();
            notification.setUsername(order.getUsername());
            notification.setMessage("Your order #" + order.getId().substring(0, 8) + " has been " + status);
            notification.setType(status.equals("APPROVED") || status.equals("DELIVERED") ? "SUCCESS" : "WARNING");
            notification.setRead(false);
            notification.setTimestamp(LocalDateTime.now());
            notificationRepo.save(notification);

            return ResponseEntity.ok("Status updated");
        }).orElse(ResponseEntity.notFound().build());
    }
}