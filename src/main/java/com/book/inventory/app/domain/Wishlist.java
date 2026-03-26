package com.book.inventory.app.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "wishlists")
public class Wishlist {
    @Id
    private String id;
    private String userId;
    private List<String> bookIds = new ArrayList<>(); // Stores book IDs
}
