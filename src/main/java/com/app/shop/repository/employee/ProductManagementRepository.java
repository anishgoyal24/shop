package com.app.shop.repository.employee;

import com.app.shop.entity.ItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductManagementRepository extends JpaRepository<ItemDetails, Integer> {

    public ItemDetails findByItemNameIgnoreCase(String itemName);

    @Query("select item from ItemDetails  item where lower(item.itemName) like %:query%")
    List<ItemDetails> search(String query);
}
