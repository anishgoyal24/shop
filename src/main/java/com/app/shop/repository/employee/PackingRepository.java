package com.app.shop.repository.employee;

import com.app.shop.entity.ItemPackingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackingRepository extends JpaRepository<ItemPackingDetails, Integer> {
}
