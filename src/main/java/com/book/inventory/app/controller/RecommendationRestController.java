package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RecommendationRestController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/popular")
    public List<Book> getPopularBooks(@RequestParam(defaultValue = "8") int limit) {
        return recommendationService.getPopularBooks(limit);
    }
}
