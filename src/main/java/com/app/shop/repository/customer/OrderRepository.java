package com.app.shop.repository.customer;

import com.app.shop.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderHeader, Integer> {

    public List<OrderHeader> findByPartyDetailsPartyEmail(String email);
}
