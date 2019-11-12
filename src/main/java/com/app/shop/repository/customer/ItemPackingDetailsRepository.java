package com.app.shop.repository.customer;

import com.app.shop.entity.ItemPackingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPackingDetailsRepository extends JpaRepository<ItemPackingDetails, Integer> {
}
