package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookRepo extends MongoRepository<Book, String>, BookRepositoryCustom {
    Book findByBookid(String bookid);
    List<Book> findByTitleContainingIgnoreCase(String title);
    List<Book> findByAuthorContainingIgnoreCase(String author);
    List<Book> findByPublicationYearBetween(String startYear, String endYear);
    List<Book> findByPriceBetween(double minPrice, double maxPrice);
    List<Book> findByAuthorAndBookidNot(String author, String bookid);
}