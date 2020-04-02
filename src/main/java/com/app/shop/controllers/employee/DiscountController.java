package com.app.shop.controllers.employee;

import com.app.shop.entity.Discount;
import com.app.shop.services.employee.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller to manage discount
@RestController
@RequestMapping(value = "/discount")
public class DiscountController {

    private DiscountService discountService;

    @Autowired
    public DiscountController(DiscountService discountService) {
        this.discountService = discountService;
    }

//  List all discounts
    @GetMapping(value = "/list")
    public HashMap<String, Object> listAll(){
        return discountService.listAll();
    }

//  Add a discount
    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> newDiscount(@RequestBody Discount discount){
        return discountService.addDiscount(discount);
    }

//  Update a discount
    @PostMapping(value = "/update")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> updateDiscount(@RequestBody Discount discount){
        return discountService.updateDiscount(discount);
    }

//  Delete a discount
    @PostMapping(value = "/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin')")
    public HashMap<String, Object> deleteDiscount(@PathVariable Integer id){
        return discountService.deleteDiscount(id);
    }
}
