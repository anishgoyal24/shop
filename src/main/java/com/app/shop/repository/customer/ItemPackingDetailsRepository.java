package com.app.shop.repository.customer;

import com.app.shop.entity.ItemPackingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemPackingDetailsRepository extends JpaRepository<ItemPackingDetails, Integer> {

    @Query("select itemPackingDetails.id, itemPackingDetails.size, itemPackingDetails.itemDetails.itemName from ItemPackingDetails itemPackingDetails where itemPackingDetails.status='y'")
    public List<Object> findAllSelected();
}
