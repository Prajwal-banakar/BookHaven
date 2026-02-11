package com.book.inventory.app.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
    private String bookId;
    private String title;
    private String author;
    private double price;
    private int quantity;
}