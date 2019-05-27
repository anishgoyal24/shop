package com.app.shop.repository.warehouse;

import com.app.shop.entity.ItemStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WarehouseStockRepository extends JpaRepository<ItemStock, Integer> {

    public ItemStock findByItemDetailsId(Integer itemId);
}
