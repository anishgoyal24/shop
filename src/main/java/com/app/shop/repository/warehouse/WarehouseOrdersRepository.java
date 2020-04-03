package com.app.shop.repository.warehouse;


import com.app.shop.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseOrdersRepository extends JpaRepository<OrderHeader, Integer> {

    public List<OrderHeader> findBYWarehouseId(Integer warehouseId);

    public OrderHeader findByOrderId(String orderId);
}
