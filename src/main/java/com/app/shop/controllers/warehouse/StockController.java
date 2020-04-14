package com.app.shop.controllers.warehouse;

import com.app.shop.entity.ItemStock;
import com.app.shop.services.warehouse.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

// Controller to manage stocks
@RestController
@RequestMapping(value = "/stock")
public class StockController {

    private StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

//  Add Stock
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @PostMapping(value = "/add")
    public HashMap<String, Object> addStock(@RequestBody ItemStock itemStock){
        return stockService.addStock(itemStock);
    }

//  Get packing details list
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/getItems")
    public HashMap<String, Object> getItemDetails(){
        return stockService.getPackingList();
    }

//  Get all stock details
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/")
    public HashMap<String, Object> getStock(@RequestParam Integer warehouseId){
        return stockService.getStockDetails(warehouseId);
    }

//  Transfer Stock
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @PostMapping(value = "/transfer")
    public HashMap<String, Object> transferStock(@RequestBody ItemStock transferredStock){
        return stockService.transferStock(transferredStock);
    }
}
