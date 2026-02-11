package com.book.inventory.app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "contact_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactMessage {
    @Id
    private String id;
    private String name;
    private String email;
    private String message;
    private LocalDateTime timestamp;
}