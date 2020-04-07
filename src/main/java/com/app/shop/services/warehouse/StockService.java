package com.app.shop.services.warehouse;

import com.app.shop.entity.ItemStock;
import com.app.shop.repository.warehouse.WarehouseStockRepository;
import com.app.shop.services.customer.ItemPackingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;

@Service
public class StockService {

    @Autowired
    private WarehouseStockRepository warehouseStockRepository;
    private HashMap<String, Object> returnObject;
    @Autowired
    private ItemPackingDetailsService itemPackingDetailsService;
    @Autowired
    private WarehouseDetailsService warehouseDetailsService;

    public HashMap<String, Object> addStock(ArrayList<ItemStock> itemStocks){
        returnObject = new HashMap<>();
        for (ItemStock itemStock : itemStocks){
            ItemStock foundStock = warehouseStockRepository.findStock(itemStock.getItemPackingDetails().getId(), itemStock.getWarehouseDetails().getWarehouseId());
            if (foundStock==null){
                itemStock.setItemPackingDetails(itemPackingDetailsService.getDetails(itemStock.getItemPackingDetails().getId()));
                itemStock.setWarehouseDetails(warehouseDetailsService.getDetails(itemStock.getWarehouseDetails().getWarehouseId()));
                warehouseStockRepository.save(itemStock);
            }
            else {
                foundStock.setQuantity(foundStock.getQuantity() + itemStock.getQuantity());
                warehouseStockRepository.save(foundStock);
            }
            returnObject.put("message", "successfully added stock");
        }
        return returnObject;
    }

    public double getItemPrice(String state, Integer itemId){
        return warehouseStockRepository.findPrice(state, itemId);
    }

    public HashMap<String, Object> getPackingList() {
        returnObject = new HashMap<>();
        returnObject.put("data", itemPackingDetailsService.getAll());
        return returnObject;
    }
}
