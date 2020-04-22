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
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addNewWarehouse(@RequestBody WarehouseDetails warehouseDetails) {
        return warehouseDetailsService.addNewWarehouse(warehouseDetails);
    }

//  Update details of a warehouse
    @PostMapping(value = "/updatedetails")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> updateDetails(@RequestBody WarehouseDetails warehouseDetails) {
        return warehouseDetailsService.updateWarehouseDetails(warehouseDetails);
    }

//  Change password of a warehouse
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_owner')")
    @PostMapping(value = "/changepassword")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object) {
        return warehouseDetailsService.changePassword(object);
    }

//  List Names of Warehouse
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/get-name")
    public HashMap<String, Object> getName(){
        return warehouseDetailsService.getNames();
    }

//  Get warehouse details
    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/details")
    public HashMap<String, Object> getName(@RequestParam("warehouseId") Integer warehouseId){
        return warehouseDetailsService.getWarehouseDetails(warehouseId);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/details-email")
    public HashMap<String, Object> getName(@RequestParam("email") String email){
        return warehouseDetailsService.getWarehouseDetails(email);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/search")
    public HashMap<String, Object> search(@RequestParam("email") String email){
        return warehouseDetailsService.search(email);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_warehouse', 'ROLE_manager', 'ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/by-state")
    public HashMap<String, Object> getByState(@RequestParam("state") String state){
        return warehouseDetailsService.getByState(state);
    }


}
