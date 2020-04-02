package com.app.shop.controllers.warehouse;

import com.app.shop.entity.WarehouseDetails;
import com.app.shop.services.warehouse.WarehouseDetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller for warehouse details
@RestController
@RequestMapping(value = "/warehouse")
public class WarehouseDetailsController {

    private WarehouseDetailsService warehouseDetailsService;

    @Autowired
    public WarehouseDetailsController(WarehouseDetailsService warehouseDetailsService) {
        this.warehouseDetailsService = warehouseDetailsService;
    }

//  New warehouse account
    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> addNewWarehouse(@RequestBody WarehouseDetails warehouseDetails) {
        return warehouseDetailsService.addNewWarehouse(warehouseDetails);
    }

//  Update details of a warehouse
    @PostMapping(value = "/updatedetails")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> updateDetails(@RequestBody WarehouseDetails warehouseDetails) {
        return warehouseDetailsService.updateWarehouseDetails(warehouseDetails);
    }

//  Change password of a warehouse
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @PostMapping(value = "/changepassword")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object) {
        return warehouseDetailsService.changePassword(object);
    }

//  List Names of Warehouse
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager')")
    @GetMapping(value = "/get-name")
    public HashMap<String, Object> getName(){
        return warehouseDetailsService.getNames();
    }
}
