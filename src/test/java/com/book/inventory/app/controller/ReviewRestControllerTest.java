package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Review;
import com.book.inventory.app.repo.ReviewRepo;
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

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ReviewRestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewRepo reviewRepo;

    @Autowired
    private ObjectMapper objectMapper;

    private Review review1;
    private Review review2;

    @BeforeEach
    void setUp() {
        review1 = new Review();
        review1.setId("1");
        review1.setBookId("B001");
        review1.setUsername("user1");
        review1.setRating(5);
        review1.setComment("Great book!");

        review2 = new Review();
        review2.setId("2");
        review2.setBookId("B002");
        review2.setUsername("user1");
        review2.setRating(4);
        review2.setComment("Good book!");
    }

    @Test
    @WithMockUser(username = "user1", roles = {"USER"})
    void testGetReviewsForBook() throws Exception {
        List<Review> reviews = Arrays.asList(review1);
        Mockito.when(reviewRepo.findByBookId("B001")).thenReturn(reviews);

        mockMvc.perform(get("/api/reviews/B001"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].comment").value("Great book!"));
    }

    @Test
    @WithMockUser(username = "user1", roles = {"USER"})
    void testGetReviewsByUser() throws Exception {
        List<Review> reviews = Arrays.asList(review1, review2);
        Mockito.when(reviewRepo.findByUsername("user1")).thenReturn(reviews);

        mockMvc.perform(get("/api/reviews/user/user1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].comment").value("Great book!"))
                .andExpect(jsonPath("$[1].comment").value("Good book!"));
    }
}