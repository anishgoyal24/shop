package com.app.shop.repository.customer;

import com.app.shop.entity.ItemStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PartyStockRepository extends JpaRepository<ItemStock, Integer> {

    @Query("select sum(stock.quantity), max(stock.price) from ItemStock stock where stock.warehouseDetails.state.stateFullCode =:state and stock.itemPackingDetails.id=:itemId group by stock.itemPackingDetails.id")
    public Object[][] findStockAndPrice(@Param("state") String state, @Param("itemId") Integer itemId);

//    @Query("select sum(stock.quantity), max(stock.price) from ItemStock stock where stock.warehouseDetails.state =:state and stock.itemDetails.itemDetails.id=:itemId group by stock.itemDetails.itemDetails.id")
//    public Object[][] findStockAndPriceOfAll(@Param("state") String state, @Param("itemId") Integer itemId);

}
