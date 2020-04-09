package com.app.shop.controllers.customer;

import com.app.shop.services.customer.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller for products
@RestController
@RequestMapping(value = "/product")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

//  Search a product
    @GetMapping(value = "/search")
    public HashMap<String, Object> searchItem(@RequestParam String searchQuery, @RequestParam String type){
        return productService.searchItem(searchQuery, type);
    }

//  Get a product's details
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    @GetMapping(value = "/getitem")
    public HashMap<String, Object> getItem(@RequestParam String state, @RequestParam Integer itemId){
        return productService.retrieveItem(itemId, state);
    }

//  Get discount on an item
    @GetMapping(value = "/discount")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> getDiscount(@RequestParam Integer itemId){
        return productService.getDiscount(itemId);
    }

//  Get Products
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> listProducts(@RequestParam String type){
        return productService.listProducts(type);
    }
}
