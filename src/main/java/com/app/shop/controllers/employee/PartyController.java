package com.app.shop.controllers.employee;

import com.app.shop.entity.Discount;
import com.app.shop.services.employee.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/discount")
public class PartyController {

    @Autowired
    private DiscountService discountService;

    @GetMapping(value = "/list")
    public HashMap<String, Object> listAll(){
        return discountService.listAll();
    }

    @PostMapping(value = "/new")
    public HashMap<String, Object> newDiscount(@RequestBody Discount discount){
        return discountService.addDiscount(discount);
    }

    @PostMapping(value = "/update")
    public HashMap<String, Object> updateDiscount(@RequestBody Discount discount){
        return discountService.updateDiscount(discount);
    }

    @PostMapping(value = "/delete/{id}")
    public HashMap<String, Object> deleteDiscount(@PathVariable Integer id){
        return discountService.deleteDiscount(id);
    }
}
