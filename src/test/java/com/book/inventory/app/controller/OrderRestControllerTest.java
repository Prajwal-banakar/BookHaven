package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Order;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.OrderRepo;
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

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderRepo orderRepo;

    @MockBean
    private BookRepo bookRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "user")
    void testPlaceOrder_Success() throws Exception {
        Book book = new Book();
        book.setId("1");
        book.setBookid("B001");
        book.setTitle("Java");
        book.setPrice(100.0);
        book.setQuantity("10");

        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);
        Mockito.when(orderRepo.save(any(Order.class))).thenReturn(new Order());

        Order orderRequest = new Order();
        orderRequest.setBookId("B001");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("Order placed successfully"));
    }

    @Test
    @WithMockUser(username = "user")
    void testPlaceOrder_OutOfStock() throws Exception {
        Book book = new Book();
        book.setId("1");
        book.setBookid("B001");
        book.setTitle("Java");
        book.setPrice(100.0);
        book.setQuantity("0");

        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);

        Order orderRequest = new Order();
        orderRequest.setBookId("B001");

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(orderRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Book out of stock"));
    }

    @Test
    @WithMockUser(username = "user")
    void testGetMyOrders() throws Exception {
        Order order = new Order();
        order.setBookTitle("Java");
        Mockito.when(orderRepo.findByUsername("user")).thenReturn(Collections.singletonList(order));

        mockMvc.perform(get("/api/orders/my-orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].bookTitle").value("Java"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testGetAllOrders_Admin() throws Exception {
        Mockito.when(orderRepo.findAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/orders/all"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testGetAllOrders_User_Forbidden() throws Exception {
        mockMvc.perform(get("/api/orders/all"))
                .andExpect(status().isForbidden());
    }
}