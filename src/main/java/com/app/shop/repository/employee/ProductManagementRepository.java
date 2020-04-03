package com.app.shop.repository.employee;

import com.app.shop.entity.ItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductManagementRepository extends JpaRepository<ItemDetails, Integer> {

    public ItemDetails findByItemNameIgnoreCase(String itemName);

    @Query("select itemdetails from ItemDetails itemdetails where itemDetails.itemId= :itemId")
    public ItemDetails findByItemId(@Param("itemId") Integer itemId);
}
