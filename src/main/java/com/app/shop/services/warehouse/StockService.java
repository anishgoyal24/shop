package com.app.shop.services.warehouse;

import com.app.shop.entity.ItemStock;
import com.app.shop.repository.warehouse.WarehouseStockRepository;
import com.app.shop.services.customer.ItemPackingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private WarehouseStockRepository warehouseStockRepository;
    private HashMap<String, Object> returnObject;
    @Autowired
    private ItemPackingDetailsService itemPackingDetailsService;
    @Autowired
    private WarehouseDetailsService warehouseDetailsService;

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addStock(ItemStock itemStock){
        returnObject = new HashMap<>();
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

    public HashMap<String, Object> getStockDetails(int warehouseId){
        returnObject = new HashMap<>();
        returnObject.put("data", warehouseStockRepository.findByWarehouseDetailsWarehouseId(warehouseId));
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> transferStock(ItemStock transferredStock) {
        returnObject = new HashMap<>();
        Optional<ItemStock> optionalItemStock = warehouseStockRepository.findById(transferredStock.getId());
        if (optionalItemStock.isPresent()){
            ItemStock foundStock = optionalItemStock.get();
            foundStock.setQuantity(foundStock.getQuantity() - transferredStock.getQuantity());
            warehouseStockRepository.save(foundStock);
            transferredStock.setId(0);
            addStock(transferredStock);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }
}
