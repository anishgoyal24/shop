package com.app.shop.repository.warehouse;

import com.app.shop.entity.ItemStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseStockRepository extends JpaRepository<ItemStock, Integer> {

    public ItemStock findByItemDetailsId(Integer itemId);

    @Query("select itemStock from ItemStock itemStock where itemStock.itemDetails.id=:itemId and itemStock.warehouseDetails.warehouseId=:warehouseId")
    public ItemStock findStock(@Param("itemId") Integer itemId, @Param("warehouseId") Integer warehouseId);
}
