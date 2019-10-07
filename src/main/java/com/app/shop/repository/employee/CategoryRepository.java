package com.app.shop.repository.employee;

import com.app.shop.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Category findByCategory(String category);
    List<Category> findByStatus(Character status);

    @Query("select category from Category category where category.category like %:cat% and category.status='y'")
    List<Category> search(@Param("cat") String cat);
}
