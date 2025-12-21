package com.book.inventory.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookApplication {
	public static void main(String[] args) {
		SpringApplication.run(BookApplication.class, args);
        System.out.println("Application started fine in 'http://localhost:8080/'");
	}
}
