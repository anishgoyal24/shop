package com.app.shop.repository.warehouse;

import com.app.shop.entity.PincodeWarehouseMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PincodeMappingRepository extends JpaRepository<PincodeWarehouseMapping, Integer> {

    @Query("select mapping.pincode from PincodeWarehouseMapping mapping where mapping.warehouseDetails.warehouseId=:warehouseId")
    List<String> findByWarehouseDetailsWarehouseId(@Param("warehouseId") Integer warehouseId);
}
