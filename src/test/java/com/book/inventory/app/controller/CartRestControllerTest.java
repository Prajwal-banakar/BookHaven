package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Cart;
import com.book.inventory.app.domain.CartItem;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.CartRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CartRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CartRepo cartRepo;

    @MockBean
    private BookRepo bookRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "user")
    void testAddToCart() throws Exception {
        Book book = new Book();
        book.setBookid("B001");
        book.setTitle("Java");
        book.setPrice(100.0);

        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);
        Mockito.when(cartRepo.findByUsername("user")).thenReturn(new Cart());
        Mockito.when(cartRepo.save(any(Cart.class))).thenReturn(new Cart());

        CartItem item = new CartItem();
        item.setBookId("B001");

        mockMvc.perform(post("/api/cart/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(item)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user")
    void testGetCart() throws Exception {
        Cart cart = new Cart();
        cart.setUsername("user");
        Mockito.when(cartRepo.findByUsername("user")).thenReturn(cart);

        mockMvc.perform(get("/api/cart"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("user"));
    }

    @Test
    @WithMockUser(username = "user")
    void testClearCart() throws Exception {
        Cart cart = new Cart();
        Mockito.when(cartRepo.findByUsername("user")).thenReturn(cart);

        mockMvc.perform(post("/api/cart/clear"))
                .andExpect(status().isOk());
    }
}