package com.app.shop.utils;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.entity.PartyType;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.employee.EmployeeOrderRepository;
import com.app.shop.repository.employee.EmployeeRepository;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.services.employee.PartyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class Startup {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @Autowired
    private PartyTypeService partyTypeService;

    @EventListener(ApplicationReadyEvent.class)
    public void addAdminStartup(ApplicationReadyEvent applicationReadyEvent){
        EmployeeDetails defaultAdmin = new EmployeeDetails();
        // Add all necessary details for defaultAdmin
        defaultAdmin.setRole("owner");
        defaultAdmin.setEmpEmail("parveengoel@gmail.com");
        defaultAdmin.setEmpName("Parveen Goel");
        defaultAdmin.setPassword("admin");
        defaultAdmin.setCountry("India");
        defaultAdmin.setState("Haryana");
        defaultAdmin.setPrimaryPhone("7027770150");
        defaultAdmin.setAddress("Karnal");
        defaultAdmin.setCity("Karnal");
        defaultAdmin.setPincode("");
        defaultAdmin.setStatus('y');
        employeeRepository.save(defaultAdmin);
        userAuthRepository.save(new UserDetails("parveengoel@gmail.com", new BCryptPasswordEncoder().encode("admin"), 1, "owner"));
        PartyType retail = new PartyType();
        retail.setId(1);
        retail.setType("retail");
        partyTypeService.addPartyType(retail);
        PartyType horeca = new PartyType();
        horeca.setType("HORECA");
        horeca.setId(2);
        partyTypeService.addPartyType(horeca);
        PartyType distributor = new PartyType();
        distributor.setId(3);
        distributor.setType("distributor");
        partyTypeService.addPartyType(distributor);
    }
}
