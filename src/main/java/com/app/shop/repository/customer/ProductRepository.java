package com.app.shop.repository.customer;

import com.app.shop.entity.ItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ItemDetails, Integer> {

    public List<ItemDetails> findByItemNameContainingIgnoreCase(String queryString);

}
