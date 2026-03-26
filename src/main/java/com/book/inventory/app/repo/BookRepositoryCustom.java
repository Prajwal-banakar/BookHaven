package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Book;
import java.util.List;

public interface BookRepositoryCustom {
    List<Book> findBooksByCriteria(String title, String author, String startYear, String endYear, Double minPrice, Double maxPrice);
}