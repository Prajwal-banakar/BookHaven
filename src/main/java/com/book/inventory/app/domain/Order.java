package com.book.inventory.app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    private String username;
    private List<CartItem> items;
    private String status; // PENDING, APPROVED, DELIVERED, CANCELLED
    private LocalDateTime orderDate;
    private double totalPrice;
    
    // Payment & Shipping Details
    private String paymentMethod;
    private String transactionId;
    private String shippingAddress;
}