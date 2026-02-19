package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Cart;
import com.book.inventory.app.domain.CartItem;
import com.book.inventory.app.domain.Notification;
import com.book.inventory.app.domain.Order;
import com.book.inventory.app.domain.User;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.CartRepo;
import com.book.inventory.app.repo.NotificationRepo;
import com.book.inventory.app.repo.OrderRepo;
import com.book.inventory.app.repo.UserRepo;
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

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

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

    @MockBean
    private CartRepo cartRepo;

    @MockBean
    private NotificationRepo notificationRepo;

    @MockBean
    private UserRepo userRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(username = "user")
    void testCheckout_Success() throws Exception {
        Cart cart = new Cart();
        cart.setUsername("user");
        CartItem item = new CartItem();
        item.setBookId("B001");
        item.setQuantity(1);
        cart.setItems(Collections.singletonList(item));
        cart.setTotalPrice(100.0);

        Book book = new Book();
        book.setBookid("B001");
        book.setQuantity("10");

        User admin = new User();
        admin.setUsername("admin");
        admin.setRole("ADMIN");

        Mockito.when(cartRepo.findByUsername("user")).thenReturn(cart);
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);
        Mockito.when(orderRepo.save(any(Order.class))).thenReturn(new Order());
        Mockito.when(userRepo.findByRole("ADMIN")).thenReturn(Collections.singletonList(admin));
        Mockito.when(notificationRepo.save(any(Notification.class))).thenReturn(new Notification());

        Order checkoutDetails = new Order();
        checkoutDetails.setPaymentMethod("Credit Card");
        checkoutDetails.setShippingAddress("123 Main St");

        mockMvc.perform(post("/api/orders/checkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkoutDetails)))
                .andExpect(status().isOk());
        
        // Verify notification sent to admin
        Mockito.verify(notificationRepo, Mockito.times(1)).save(any(Notification.class));
    }

    @Test
    @WithMockUser(username = "user")
    void testCheckout_OutOfStock() throws Exception {
        Cart cart = new Cart();
        cart.setUsername("user");
        CartItem item = new CartItem();
        item.setBookId("B001");
        item.setQuantity(1);
        cart.setItems(Collections.singletonList(item));

        Book book = new Book();
        book.setBookid("B001");
        book.setQuantity("0"); // Out of stock

        Mockito.when(cartRepo.findByUsername("user")).thenReturn(cart);
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);

        Order checkoutDetails = new Order();

        mockMvc.perform(post("/api/orders/checkout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(checkoutDetails)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(org.hamcrest.Matchers.containsString("Not enough stock")));
    }

    @Test
    @WithMockUser(username = "user")
    void testGetMyOrders() throws Exception {
        Order order = new Order();
        order.setUsername("user");
        Mockito.when(orderRepo.findByUsername("user")).thenReturn(Collections.singletonList(order));

        mockMvc.perform(get("/api/orders/my-orders"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("user"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testUpdateStatus_Approve() throws Exception {
        Order order = new Order();
        order.setId("O001");
        order.setUsername("user");
        order.setStatus("PENDING");
        CartItem item = new CartItem();
        item.setBookId("B001");
        item.setQuantity(1);
        order.setItems(Collections.singletonList(item));

        Book book = new Book();
        book.setBookid("B001");
        book.setQuantity("10");

        Mockito.when(orderRepo.findById("O001")).thenReturn(Optional.of(order));
        Mockito.when(bookRepo.findByBookid("B001")).thenReturn(book);
        Mockito.when(orderRepo.save(any(Order.class))).thenReturn(order);
        Mockito.when(notificationRepo.save(any(Notification.class))).thenReturn(new Notification());

        mockMvc.perform(put("/api/orders/O001/status")
                .param("status", "APPROVED"))
                .andExpect(status().isOk())
                .andExpect(content().string("Status updated"));
        
        // Verify notification sent to user
        Mockito.verify(notificationRepo, Mockito.times(1)).save(any(Notification.class));
    }
}