package com.book.inventory.app.repo;

import com.book.inventory.app.domain.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepositoryCustomImpl implements BookRepositoryCustom {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Book> findBooksByCriteria(String title, String author, String startYear, String endYear, Double minPrice, Double maxPrice) {
        Query query = new Query();
        if (title != null && !title.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(title, "i"));
        }
        if (author != null && !author.isEmpty()) {
            query.addCriteria(Criteria.where("author").regex(author, "i"));
        }
        if (startYear != null && !startYear.isEmpty() && endYear != null && !endYear.isEmpty()) {
            query.addCriteria(Criteria.where("publicationYear").gte(startYear).lte(endYear));
        }
        if (minPrice != null && maxPrice != null) {
            query.addCriteria(Criteria.where("price").gte(minPrice).lte(maxPrice));
        }
        return mongoTemplate.find(query, Book.class);
    }
}