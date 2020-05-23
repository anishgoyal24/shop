package com.app.shop.controllers.employee;

import com.app.shop.entity.ItemDetails;
import com.app.shop.services.employee.ProductManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;

// Controller for product management
@RestController
@RequestMapping(value = "/product/management")
public class ProductManagementController {

    private ProductManagementService productManagementService;

    @Autowired
    public ProductManagementController(ProductManagementService productManagementService) {
        this.productManagementService = productManagementService;
    }

//  Add a product
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/add")
    public HashMap<String, Object> addProduct(@RequestParam("itemDetails") String itemDetails){
        return productManagementService.addProduct(itemDetails);
    }

//  Delete a product
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/delete/{itemId}")
    public HashMap<String, Object> deleteProduct(@PathVariable Integer itemId){
        return productManagementService.deleteProduct(itemId);
    }

//  Enable product
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/enable/{itemId}")
    public HashMap<String, Object> enableProduct(@PathVariable Integer itemId){
        return productManagementService.enableProduct(itemId);
    }

//  Add product packing
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/addpacking")
    public HashMap<String, Object> addPacking(@RequestBody ItemDetails itemDetails){
        return productManagementService.addPacking(itemDetails);
    }


//  Delete product packing
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/deletepacking")
    public HashMap<String, Object> deletePacking(@RequestBody ItemDetails itemDetails){
        return productManagementService.deletePacking(itemDetails);
    }

//  List all products
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/listproducts")
    public HashMap<String, Object> listProducts(){
        return productManagementService.listProducts();
    }

//  Update product
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/update")
    public HashMap<String, Object> updateProduct(@RequestBody ItemDetails itemDetails){
        return productManagementService.updateProduct(itemDetails);
    }

//  Enable packing
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/enablepacking")
    public HashMap<String, Object> enablePacking(@RequestParam Integer itemId, @RequestParam Integer packingId){
        return productManagementService.enablePacking(itemId, packingId);
    }

//  Add Category
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/addcategory")
    public HashMap<String, Object> addCategory(@RequestParam Integer itemId, @RequestParam Integer categoryId){
        return productManagementService.addCategory(itemId, categoryId);
    }

    //  Remove Category
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @PostMapping(value = "/removecategory")
    public HashMap<String, Object> removeCategory(@RequestParam Integer itemId, @RequestParam Integer categoryId){
        return productManagementService.removeCategory(itemId, categoryId);
    }

    //
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    @GetMapping(value = "/search")
    public HashMap<String, Object> search(@RequestParam String query){
        return productManagementService.search(query);
    }
}
