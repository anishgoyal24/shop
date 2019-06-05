package com.app.shop.controllers.customer;

import com.app.shop.services.customer.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/search")
    public HashMap<String, Object> searchItem(@RequestParam String searchQuery, @RequestParam String type){
        return productService.searchItem(searchQuery, type);
    }

    @GetMapping(value = "/getitem")
    public HashMap<String, Object> getItem(@RequestParam String state, Integer itemId){
        return productService.retrieveItem(itemId, state);
    }

    @GetMapping(value = "/discount")
    public HashMap<String, Object> getDiscount(@RequestParam Integer itemId){
        return productService.getDiscount(itemId);
    }
}
