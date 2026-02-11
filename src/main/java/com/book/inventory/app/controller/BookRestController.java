package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class BookRestController {

    @Autowired
    private BookRepo repo;

    @GetMapping
    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        Book book = repo.findByBookid(id);
        if (book != null) {
            return ResponseEntity.ok(book);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book bookDetails) {
        Book book = repo.findByBookid(id);
        if (book != null) {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setPublisher(bookDetails.getPublisher());
            book.setPublicationYear(bookDetails.getPublicationYear());
            book.setPrice(bookDetails.getPrice());
            book.setQuantity(bookDetails.getQuantity());
            book.setLanguage(bookDetails.getLanguage());
            final Book updatedBook = repo.save(book);
            return ResponseEntity.ok(updatedBook);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        Book book = repo.findByBookid(id);
        if (book != null) {
            repo.delete(book);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}