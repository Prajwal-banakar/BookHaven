package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.BookRequest;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.BookRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class BookController {

    @Autowired
    private BookRepo repo;

    @Autowired
    private BookRequestRepo requestRepo;

    @GetMapping("/")
    public String showIndex(Model model) {
        model.addAttribute("book", new Book());
        return "index";
    }

    @GetMapping("/addBook")
    public String showAddBook(Model model) {
        model.addAttribute("book", new Book());
        return "addbook";
    }

    @GetMapping("/deleteBook")
    public String showDeleteBook(Model model) {
        model.addAttribute("book", new Book());
        return "deletebook";
    }

    @GetMapping("/search")
    public String searchBook(Model model) {
        model.addAttribute("book", new Book());
        return "search";
    }

    @GetMapping("/contact")
    public String contact(Model model) {
        model.addAttribute("bookRequest", new BookRequest());
        return "contact";
    }

    @GetMapping("/info")
    public String getInfo(Model model) {
        long totalBooks = repo.count();
        double totalBooksPrice = repo.findAll().stream().mapToDouble(Book::getPrice).sum();
        long totalAuthors = repo.findAll().stream().map(Book::getAuthor).distinct().count();

        List<Book> books = repo.findAll();

        model.addAttribute("totalBooks", totalBooks);
        model.addAttribute("totalBooksPrice", totalBooksPrice);
        model.addAttribute("totalAuthors", totalAuthors);
        model.addAttribute("books", books);

        return "info";
    }

    @PostMapping("/addBook")
    public String saveBook(@ModelAttribute Book book, Model model) {
        try {
            repo.save(book);
            model.addAttribute("message", "Book added successfully.");
        } catch (Exception e) {
            model.addAttribute("error", "Failed to add book: " + e.getMessage());
        }
        model.addAttribute("book", new Book());
        return "addbook";
    }

    @PostMapping("/search")
    public String searchBook(@ModelAttribute Book book, Model model) {
        Book foundBook = repo.findByBookid(book.getBookid());

        if (foundBook != null) {
            model.addAttribute("book", foundBook);
        } else {
            model.addAttribute("errorMessage", "Book not found!");
        }

        return "search";
    }

    @PostMapping("/deleteBook")
    public String deleteBook(@ModelAttribute Book book, Model model) {
        String bookId = book.getBookid();
        Book deleteBook = repo.findByBookid(bookId);

        if (deleteBook != null) {
            repo.delete(deleteBook);
            model.addAttribute("message", "Book Deleted Successfully");
        } else {
            model.addAttribute("error", "Book not found!");
        }
        model.addAttribute("book", new Book());
        return "deletebook";
    }

    @PostMapping("/request")
    public String handleBookRequest(@ModelAttribute BookRequest bookRequest, Model model) {
        try {
            requestRepo.save(bookRequest);
            model.addAttribute("message", "Your request has been submitted successfully.");
        } catch (Exception e) {
            model.addAttribute("error", "Failed to submit your request: " + e.getMessage());
        }
        model.addAttribute("bookRequest", new BookRequest());
        return "contact";
    }
}