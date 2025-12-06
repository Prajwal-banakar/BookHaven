package com.book.inventory.app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "bookrequests")
public class BookRequest {

    @Id
    private String id;
    private String title;
    private String author;
    private String email;
}
