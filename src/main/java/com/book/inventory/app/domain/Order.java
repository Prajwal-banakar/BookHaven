package com.book.inventory.app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    private String id;
    private String bookId;
    private String bookTitle;
    private String username;
    private String status; // PENDING, APPROVED, DELIVERED, CANCELLED
    private LocalDateTime orderDate;
    private double price;
}