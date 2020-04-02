package com.app.shop.controllers.customer;

import com.app.shop.entity.OrderHeader;
import com.app.shop.services.customer.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller  to manage and place orders
@RestController
@RequestMapping(value = "/order")
public class OrderController {

    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

//  Checks if all items in the order are available
    @GetMapping(value = "/check")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> checkOrder(@RequestBody OrderHeader orderHeader){
        return orderService.checkStock(orderHeader);
    }

//  Places the order
    @PostMapping(value = "/place")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> placeOrder(@RequestBody OrderHeader orderHeader){
        return orderService.placeOrder(orderHeader);
    }

//  Get the order list of a user
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> getOrder(@RequestParam String email){
        return orderService.getOrders(email);
    }
}
