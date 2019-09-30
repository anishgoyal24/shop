package com.app.shop.utils;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.services.employee.EmployeeDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Startup {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;
    @Autowired
    private UserAuthRepository userAuthRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void addAdminStartup(ApplicationReadyEvent applicationReadyEvent){
        EmployeeDetails defaultAdmin = new EmployeeDetails();
        // Add all necessary details for defaultAdmin
        defaultAdmin.setRole("owner");
        defaultAdmin.setEmpName("Parveen Goel");
        defaultAdmin.setPassword("admin");
        defaultAdmin.setCountry("India");
        defaultAdmin.setState("Haryana");
        defaultAdmin.setPrimaryPhone("7027770150");
        employeeDetailsService.addNewEmployee(defaultAdmin);
        userAuthRepository.save(new UserDetails("Parveen Goel", new BCryptPasswordEncoder().encode("admin"), 1, "admin"));
    }
}
