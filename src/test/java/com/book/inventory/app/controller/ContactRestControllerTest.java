package com.book.inventory.app.controller;

import com.book.inventory.app.domain.ContactMessage;
import com.book.inventory.app.repo.ContactMessageRepo;
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
public class ContactRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactMessageRepo contactRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testSendMessage() throws Exception {
        ContactMessage message = new ContactMessage();
        message.setName("John");
        message.setEmail("john@example.com");
        message.setMessage("Hello");

        Mockito.when(contactRepo.save(any(ContactMessage.class))).thenReturn(message);

        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(message)))
                .andExpect(status().isOk())
                .andExpect(content().string("Message sent successfully"));
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void testGetAllMessages_Admin() throws Exception {
        Mockito.when(contactRepo.findAll()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/contact/all"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void testGetAllMessages_User_Forbidden() throws Exception {
        mockMvc.perform(get("/api/contact/all"))
                .andExpect(status().isForbidden());
    }
}