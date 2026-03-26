package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Wishlist;
import com.book.inventory.app.repo.WishlistRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class WishlistRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private WishlistRepo wishlistRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private Wishlist wishlist;

    @BeforeEach
    void setUp() {
        wishlist = new Wishlist();
        wishlist.setId("1");
        wishlist.setUserId("user");
        wishlist.setBookIds(new ArrayList<>(List.of("B001")));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testGetWishlist() throws Exception {
        Mockito.when(wishlistRepo.findByUserId("user")).thenReturn(Optional.of(wishlist));

        mockMvc.perform(get("/api/wishlist"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("user"))
                .andExpect(jsonPath("$.bookIds[0]").value("B001"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testAddBookToWishlist() throws Exception {
        Mockito.when(wishlistRepo.findByUserId("user")).thenReturn(Optional.of(wishlist));
        Mockito.when(wishlistRepo.save(any(Wishlist.class))).thenReturn(wishlist);

        mockMvc.perform(post("/api/wishlist/B002"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testAddBookToNewWishlist() throws Exception {
        Mockito.when(wishlistRepo.findByUserId("user")).thenReturn(Optional.empty());
        Mockito.when(wishlistRepo.save(any(Wishlist.class))).thenAnswer(invocation -> invocation.getArgument(0));

        mockMvc.perform(post("/api/wishlist/B001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("user"))
                .andExpect(jsonPath("$.bookIds[0]").value("B001"));
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testRemoveBookFromWishlist() throws Exception {
        Mockito.when(wishlistRepo.findByUserId("user")).thenReturn(Optional.of(wishlist));
        Mockito.when(wishlistRepo.save(any(Wishlist.class))).thenReturn(wishlist);

        mockMvc.perform(delete("/api/wishlist/B001"))
                .andExpect(status().isOk());
    }
}