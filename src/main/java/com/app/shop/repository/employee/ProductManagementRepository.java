package com.app.shop.repository.employee;

import com.app.shop.entity.ItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductManagementRepository extends JpaRepository<ItemDetails, Integer> {

    public ItemDetails findByItemNameIgnoreCase(String itemName);
    public ItemDetails findByItemId(Integer itemId);
}
