package com.app.shop.controllers.customer;

import com.app.shop.entity.ItemDetails;
import com.app.shop.services.customer.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/search")
    public List<ItemDetails> searchItem(@RequestParam String searchQuery){
        return productService.searchItem(searchQuery);
    }
}
