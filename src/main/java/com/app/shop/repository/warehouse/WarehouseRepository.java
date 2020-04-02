package com.app.shop.repository.warehouse;

import com.app.shop.entity.WarehouseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseRepository extends JpaRepository<WarehouseDetails, Integer>{

    public WarehouseDetails findByWarehouseEmail(String email);

    @Query("select warehouse.warehouseId, warehouse.warehouseName from WarehouseDetails warehouse")
    public Object[] getNames();
}