package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.repo.BookRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class BookRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookRepo bookRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private Book book1;
    private Book book2;
    private Book book3;

    @BeforeEach
    void setUp() {
        book1 = new Book();
        book1.setId("1");
        book1.setBookid("B001");
        book1.setTitle("Java Basics");
        book1.setAuthor("John Doe");
        book1.setPublisher("TechPub");
        book1.setPublicationYear("2023");
        book1.setPrice(500.0);
        book1.setQuantity("10");
        book1.setLanguage("English");

        book2 = new Book();
        book2.setId("2");
        book2.setBookid("B002");
        book2.setTitle("Spring Boot in Action");
        book2.setAuthor("Jane Doe");
        book2.setPublisher("TechPub");
        book2.setPublicationYear("2024");
        book2.setPrice(800.0);
        book2.setQuantity("5");
        book2.setLanguage("English");

        book3 = new Book();
        book3.setId("3");
        book3.setBookid("B003");
        book3.setTitle("Advanced Java");
        book3.setAuthor("John Doe");
        book3.setPublisher("O'Reilly");
        book3.setPublicationYear("2022");
        book3.setPrice(750.0);
        book3.setQuantity("7");
        book3.setLanguage("English");
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testGetAllBooks() throws Exception {
        List<Book> books = Arrays.asList(book1, book2);
        Mockito.when(bookRepo.findAll()).thenReturn(books);

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].title").value("Java Basics"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testGetBookById() throws Exception {
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book1);

        mockMvc.perform(get("/api/books/B001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Java Basics"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksByTitle() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq("Java"), eq(null), eq(null), eq(null), eq(null), eq(null)))
                .thenReturn(Arrays.asList(book1, book3));

        mockMvc.perform(get("/api/books/search").param("title", "Java"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].title").value("Java Basics"))
                .andExpect(jsonPath("$[1].title").value("Advanced Java"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksByAuthor() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq(null), eq("John Doe"), eq(null), eq(null), eq(null), eq(null)))
                .thenReturn(Arrays.asList(book1, book3));

        mockMvc.perform(get("/api/books/search").param("author", "John Doe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].author").value("John Doe"))
                .andExpect(jsonPath("$[1].author").value("John Doe"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksByPublicationYearRange() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq(null), eq(null), eq("2023"), eq("2024"), eq(null), eq(null)))
                .thenReturn(Arrays.asList(book1, book2));

        mockMvc.perform(get("/api/books/search")
                        .param("startYear", "2023")
                        .param("endYear", "2024"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].publicationYear").value("2023"))
                .andExpect(jsonPath("$[1].publicationYear").value("2024"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksByPriceRange() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq(null), eq(null), eq(null), eq(null), eq(600.0), eq(800.0)))
                .thenReturn(Arrays.asList(book2, book3));

        mockMvc.perform(get("/api/books/search")
                        .param("minPrice", "600.0")
                        .param("maxPrice", "800.0"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].price").value(800.0))
                .andExpect(jsonPath("$[1].price").value(750.0));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksByTitleAndAuthor() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq("Java"), eq("John Doe"), eq(null), eq(null), eq(null), eq(null)))
                .thenReturn(Arrays.asList(book1, book3));

        mockMvc.perform(get("/api/books/search")
                        .param("title", "Java")
                        .param("author", "John Doe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].title").value("Java Basics"))
                .andExpect(jsonPath("$[0].author").value("John Doe"))
                .andExpect(jsonPath("$[1].title").value("Advanced Java"))
                .andExpect(jsonPath("$[1].author").value("John Doe"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testSearchBooksNoParameters() throws Exception {
        Mockito.when(bookRepo.findBooksByCriteria(eq(null), eq(null), eq(null), eq(null), eq(null), eq(null)))
                .thenReturn(Arrays.asList(book1, book2, book3));

        mockMvc.perform(get("/api/books/search"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(3));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testAddBook_Admin() throws Exception {
        Mockito.when(bookRepo.save(any(Book.class))).thenReturn(book1);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Java Basics"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testAddBook_User_Forbidden() throws Exception {
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book1)))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testUpdateBook_Admin() throws Exception {
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book1);
        Mockito.when(bookRepo.save(any(Book.class))).thenReturn(book1);

        book1.setPrice(600.0);

        mockMvc.perform(put("/api/books/B001")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.price").value(600.0));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testDeleteBook_Admin() throws Exception {
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book1);
        
        mockMvc.perform(delete("/api/books/B001"))
                .andExpect(status().isOk());
    }
}