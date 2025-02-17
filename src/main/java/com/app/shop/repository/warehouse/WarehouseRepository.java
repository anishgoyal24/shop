package com.app.shop.repository.warehouse;

import com.app.shop.entity.WarehouseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WarehouseRepository extends JpaRepository<WarehouseDetails, Integer>{

    public WarehouseDetails findByWarehouseEmail(String email);

    @Query("select warehouse.warehouseId, warehouse.warehouseName from WarehouseDetails warehouse")
    public Object[] getNames();

    public WarehouseDetails findByWarehouseId(@Param("warehouseId") Integer warehouseId);

    WarehouseDetails findByPrimaryPhone(String primaryPhone);

    @Query("select warehouse.warehouseId, warehouse.warehouseName, warehouse.warehouseEmail from WarehouseDetails warehouse where lower(warehouse.warehouseName) like %:name%")
    List<Object> findByWarehouseNameContaining(@Param("name") String name);

    @Query("select warehouse.warehouseName, warehouse.warehouseId from WarehouseDetails warehouse where lower(warehouse.state.stateFullCode) =:state and warehouse.type='static'")
    List<Object> findByState(@Param("state") String state);

    @Query("select warehouse.warehouseId, warehouse.warehouseName from WarehouseDetails warehouse where warehouse.ownerWarehouse=:warehouseId and warehouse.type='dynamic'")
    List<Object[]> findDynamic(@Param("warehouseId") Integer warehouseId);
}