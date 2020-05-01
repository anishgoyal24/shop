package com.app.shop.repository.warehouse;


import com.app.shop.entity.OrderHeader;
import org.hibernate.criterion.Order;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface WarehouseOrdersRepository extends PagingAndSortingRepository<OrderHeader, Integer> {

    public List<OrderHeader> findTop10ByWarehouseDetailsWarehouseIdOrderByOrderDateDesc(Integer warehouseId);

    public OrderHeader findByOrderId(String orderId);

    @Query("select orderHeader from OrderHeader orderHeader where orderHeader.warehouseDetails.warehouseId=:warehouseId and orderHeader.orderDate<:orderDate order by orderHeader.orderDate desc")
    public List<OrderHeader> findNext10ByWarehouseDetails(@Param("warehouseId") int warehouseId, @Param("orderDate") Date orderDate, Pageable pageable);
}
