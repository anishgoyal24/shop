package com.app.shop.utils;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.services.employee.EmployeeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class Startup {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @EventListener
    public void addAdminStartup(ApplicationReadyEvent applicationReadyEvent){
        EmployeeDetails defaultAdmin = new EmployeeDetails();
        // Add all necessary details for defaultAdmin
        employeeDetailsService.addNewEmployee(defaultAdmin);
    }
}
