package com.app.shop.services.warehouse;

import com.app.shop.entity.ItemStock;
import com.app.shop.repository.warehouse.WarehouseStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class StockService {

    @Autowired
    private WarehouseStockRepository warehouseStockRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> addStock(ArrayList<ItemStock> itemStocks){
        returnObject = new HashMap<>();
        for (ItemStock itemStock : itemStocks){
            ItemStock foundStock = warehouseStockRepository.findStock(itemStock.getItemDetails().getId(), itemStock.getWarehouseDetails().getWarehouseId());
            if (foundStock==null){
                warehouseStockRepository.save(itemStock);
                returnObject.put("message", "successfully added stock");
            }
            else {
                foundStock.setQuantity(foundStock.getQuantity() + itemStock.getQuantity());
                warehouseStockRepository.save(foundStock);
                returnObject.put("message", "successfully added stock");
            }
        }
        return returnObject;
    }
}
