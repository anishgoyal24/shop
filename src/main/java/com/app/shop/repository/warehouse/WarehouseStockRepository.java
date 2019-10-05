package com.app.shop.repository.warehouse;

import com.app.shop.entity.ItemStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseStockRepository extends JpaRepository<ItemStock, Integer> {

    public ItemStock findByItemPackingDetailsId(Integer itemId);

    @Query("select itemStock from ItemStock itemStock where itemStock.itemPackingDetails.id=:itemId and itemStock.warehouseDetails.warehouseId=:warehouseId")
    public ItemStock findStock(@Param("itemId") Integer itemId, @Param("warehouseId") Integer warehouseId);

    @Query("select itemStock.price from ItemStock itemStock where itemStock.warehouseDetails.state=:state and itemStock.itemPackingDetails.id=:itemId")
    public Double findPrice(@Param("state") String state, @Param("itemId") Integer id);
}
