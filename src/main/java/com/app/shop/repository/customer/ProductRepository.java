package com.app.shop.repository.customer;

import com.app.shop.entity.ItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ItemDetails, Integer> {

    @Query("select item from ItemDetails item where item.status='y' and item.itemName like %:searchQuery%")
    public List<ItemDetails> findByItemNameContainingIgnoreCase(@Param("searchQuery") String queryString);

}
