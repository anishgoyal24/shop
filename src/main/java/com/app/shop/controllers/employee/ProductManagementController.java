package com.app.shop.controllers.employee;

import com.app.shop.entity.ItemDetails;
import com.app.shop.services.employee.ProductManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/product/management")
public class ProductManagementController {

    @Autowired
    private ProductManagementService productManagementService;

    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    @PostMapping(value = "/add")
    public HashMap<String, Object> addProduct(@RequestBody ItemDetails itemDetails){
        return productManagementService.addProduct(itemDetails);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    @PostMapping(value = "/delete/{itemId}")
    public HashMap<String, Object> deleteProduct(@PathVariable Integer itemId){
        return productManagementService.deleteProduct(itemId);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    @PostMapping(value = "/addpacking")
    public HashMap<String, Object> addPacking(@RequestBody ItemDetails itemDetails){
        return productManagementService.addPacking(itemDetails);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    @PostMapping(value = "/deletepacking")
    public HashMap<String, Object> deletePacking(@RequestBody ItemDetails itemDetails){
        return productManagementService.deletePacking(itemDetails);
    }

    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    @GetMapping(value = "/listproducts")
    public HashMap<String, Object> listProducts(){
        return productManagementService.listProducts();
    }
}
