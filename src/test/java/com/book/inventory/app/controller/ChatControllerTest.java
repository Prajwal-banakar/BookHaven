package com.book.inventory.app.controller;

import com.book.inventory.app.domain.ChatMessage;
import com.book.inventory.app.repo.ChatMessageRepo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChatMessageRepo chatRepo;

    @Test
    @WithMockUser(username = "user1")
    void testGetChatHistory() throws Exception {
        ChatMessage message = new ChatMessage();
        message.setFromUser("user1");
        message.setToUser("admin");
        message.setContent("Hello");

        Mockito.when(chatRepo.findByFromUserAndToUserOrFromUserAndToUserOrderByTimestampAsc("user1", "admin", "admin", "user1"))
                .thenReturn(Collections.singletonList(message));

        mockMvc.perform(get("/api/chat/history/admin"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("Hello"));
    }
}