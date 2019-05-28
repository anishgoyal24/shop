package com.app.shop.repository.customer;

import com.app.shop.entity.PartyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyTypeRepository extends JpaRepository<PartyType, Integer> {
}
