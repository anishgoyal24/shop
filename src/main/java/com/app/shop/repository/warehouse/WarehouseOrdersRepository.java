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
public interface WarehouseOrdersRepository extends PagingAndSortingRepository<OrderHeader, String> {

    public List<OrderHeader> findByWarehouseDetailsWarehouseIdOrderByOrderDateDesc(Integer warehouseId, Pageable pageable);

    public OrderHeader findByOrderId(String orderId);

    @Query("select orderHeader from OrderHeader orderHeader where orderHeader.warehouseDetails.warehouseId=:warehouseId and orderHeader.orderDate<:orderDate order by orderHeader.orderDate desc")
    public List<OrderHeader> findNext10ByWarehouseDetails(@Param("warehouseId") int warehouseId, @Param("orderDate") Date orderDate, Pageable pageable);

    @Query("select orderHeader from OrderHeader orderHeader where orderHeader.partyDetails.pincode in :pincodes and orderHeader.status=:status")
    public List<OrderHeader> findByPartyDetailsPincodeAndStatus(@Param("pincodes") List<String> pincodes, @Param("status") String status);
}
