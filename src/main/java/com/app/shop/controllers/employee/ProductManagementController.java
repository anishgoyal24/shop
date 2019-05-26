package com.app.shop.controllers.employee;

import com.app.shop.entity.ItemDetails;
import com.app.shop.services.employee.ProductManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/product/management")
public class ProductManagementController {

    @Autowired
    private ProductManagementService productManagementService;

    @PostMapping(value = "/add")
    public HashMap<String, Object> addProduct(@RequestBody ItemDetails itemDetails){
        return productManagementService.addProduct(itemDetails);
    }
}
