package com.app.shop.repository.customer;

import com.app.shop.entity.ItemStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerStockRepository extends JpaRepository<ItemStock, Integer> {

    @Query("select sum(stock.quantity), max(stock.price) from ItemStock stock where stock.warehouseDetails.state =:state and stock.itemDetails.id=:itemId group by stock.itemDetails.id")
    public Object findStockAndPrice(@Param("state") String state, @Param("itemId") Integer itemId);

}
