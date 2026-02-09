package com.book.inventory.app.controller;

import com.book.inventory.app.domain.User;
import com.book.inventory.app.repo.UserRepo;
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
public class AuthRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepo userRepo;

    @Test
    void testRegisterUser_Success() throws Exception {
        Mockito.when(userRepo.findByUsername("newuser")).thenReturn(null);
        Mockito.when(userRepo.save(any(User.class))).thenReturn(new User());

        mockMvc.perform(post("/register")
                .param("username", "newuser")
                .param("password", "password")
                .param("fullName", "New User")
                .param("email", "new@example.com")
                .param("phoneNumber", "1234567890")
                .param("address", "123 Main St"))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully"));
    }

    @Test
    void testRegisterUser_UsernameExists() throws Exception {
        Mockito.when(userRepo.findByUsername("existing")).thenReturn(new User());

        mockMvc.perform(post("/register")
                .param("username", "existing")
                .param("password", "password")
                .param("fullName", "Existing User")
                .param("email", "existing@example.com")
                .param("phoneNumber", "1234567890")
                .param("address", "123 Main St"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Username already exists"));
    }

    @Test
    @WithMockUser(username = "testuser")
    void testGetUserProfile() throws Exception {
        User user = new User();
        user.setUsername("testuser");
        user.setFullName("Test User");
        
        Mockito.when(userRepo.findByUsername("testuser")).thenReturn(user);

        mockMvc.perform(get("/api/auth/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.fullName").value("Test User"));
    }
}