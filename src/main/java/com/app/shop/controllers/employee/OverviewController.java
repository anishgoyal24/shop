package com.app.shop.controllers.employee;

import com.app.shop.services.employee.OverviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

// Dashboard for admin application
@RestController
@RequestMapping(value = "/overview")
public class OverviewController {

    private OverviewService overviewService;

    @Autowired
    public OverviewController(OverviewService overviewService){
        this.overviewService = overviewService;
    }

//   List all orders this month
    @GetMapping(value = "/orders/list")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getOrdersOverview(@RequestParam("month") int month, @RequestParam("year") int year){
        return overviewService.getOrdersOverview(month, year);
    }

//  Get count of all orders this month
    @GetMapping(value = "/orders")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getOrdersCount(@RequestParam("month") int month, @RequestParam("year") int year){
        return overviewService.getOrdersCount(month, year);
    }

//  Get product sales overview
    @GetMapping(value = "/product")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getProductsOverview(@RequestParam("month") int month, @RequestParam("year") int year){
        return overviewService.getProductsOverview(month, year);
    }

//  Get state overview
    @GetMapping(value = "/state")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getStateOverview(@RequestParam("month") int month, @RequestParam("year") int year){
        return overviewService.getStateOverview(month, year);
    }

}
