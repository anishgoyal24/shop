package com.app.shop.controllers.warehouse;

import com.app.shop.entity.ItemStock;
import com.app.shop.services.warehouse.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

@RestController
@RequestMapping(value = "/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping(value = "/add")
    public HashMap<String, Object> addStock(@RequestBody ItemStock[] itemStocks){
        ArrayList<ItemStock> stockArrayList = new ArrayList<ItemStock>(Arrays.asList(itemStocks));
        return stockService.addStock(stockArrayList);
    }
}
