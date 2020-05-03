package com.app.shop.controllers.warehouse;


import com.app.shop.services.warehouse.WarehouseOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/warehouse/orders")
public class WarehouseOrdersController {

    private WarehouseOrdersService warehouseOrdersService;

    @Autowired
    public WarehouseOrdersController(WarehouseOrdersService warehouseOrdersService) {
        this.warehouseOrdersService = warehouseOrdersService;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/getorders")
    public HashMap<String, Object> getOrderHeader(@RequestParam Integer warehouseId, @RequestParam Integer page){
        return warehouseOrdersService.getOrderHeader(warehouseId, page);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/getorders/next")
    public HashMap<String, Object> getNextOrderHeader(@RequestParam Integer warehouseId, @RequestParam Date orderDate){
        return warehouseOrdersService.getNextOrderHeader(warehouseId, orderDate);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/orderdetails")
    public HashMap<String, Object> getOrderDetails(@RequestParam String orderId){
        return warehouseOrdersService.getOrderDetails(orderId);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/open")
    public HashMap<String, Object> getOpenOrders(@RequestParam Integer warehouseId){
        return warehouseOrdersService.getOpenOrders(warehouseId);
    }
}
