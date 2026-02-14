package com.book.inventory.app.controller;

import com.book.inventory.app.domain.Book;
import com.book.inventory.app.domain.Cart;
import com.book.inventory.app.domain.CartItem;
import com.book.inventory.app.repo.BookRepo;
import com.book.inventory.app.repo.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
public class CartRestController {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private BookRepo bookRepo;

    private Cart getOrCreateCart(String username) {
        Cart cart = cartRepo.findByUsername(username);
        if (cart == null) {
            cart = new Cart();
            cart.setUsername(username);
        }
        return cart;
    }

    private void calculateTotal(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(total);
    }

    @GetMapping
    public ResponseEntity<Cart> getCart() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(getOrCreateCart(auth.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItem request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        Book book = bookRepo.findByBookid(request.getBookId());
        if (book == null) return ResponseEntity.badRequest().body("Book not found");
        
        Cart cart = getOrCreateCart(username);
        
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getBookId().equals(request.getBookId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + 1);
        } else {
            CartItem newItem = new CartItem();
            newItem.setBookId(book.getBookid());
            newItem.setTitle(book.getTitle());
            newItem.setAuthor(book.getAuthor());
            newItem.setPrice(book.getPrice());
            newItem.setQuantity(1);
            cart.getItems().add(newItem);
        }
        
        calculateTotal(cart);
        cartRepo.save(cart);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuantity(@RequestBody CartItem request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Cart cart = getOrCreateCart(auth.getName());
        
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getBookId().equals(request.getBookId()))
                .findFirst();

        if (existingItem.isPresent()) {
            if (request.getQuantity() > 0) {
                existingItem.get().setQuantity(request.getQuantity());
            } else {
                cart.getItems().remove(existingItem.get());
            }
            calculateTotal(cart);
            cartRepo.save(cart);
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/remove/{bookId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable String bookId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Cart cart = getOrCreateCart(auth.getName());
        
        cart.getItems().removeIf(item -> item.getBookId().equals(bookId));
        calculateTotal(cart);
        cartRepo.save(cart);
        return ResponseEntity.ok(cart);
    }
    
    @PostMapping("/clear")
    public ResponseEntity<?> clearCart() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Cart cart = getOrCreateCart(auth.getName());
        cart.getItems().clear();
        cart.setTotalPrice(0);
        cartRepo.save(cart);
        return ResponseEntity.ok().build();
    }
}