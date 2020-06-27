package com.app.shop.utils;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.entity.PartyDetails;
import com.app.shop.entity.PartyType;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.CountryRepository;
import com.app.shop.repository.common.StateRepository;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.customer.DetailsRepository;
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

    private EmployeeRepository employeeRepository;
    private UserAuthRepository userAuthRepository;
    private PartyTypeService partyTypeService;
    private CountryRepository countryRepository;
    private StateRepository stateRepository;
    private DetailsRepository detailsRepository

    @Autowired
    public Startup(EmployeeRepository employeeRepository, UserAuthRepository userAuthRepository, PartyTypeService partyTypeService, CountryRepository countryRepository, StateRepository stateRepository, DetailsRepository detailsRepository) {
        this.employeeRepository = employeeRepository;
        this.userAuthRepository = userAuthRepository;
        this.partyTypeService = partyTypeService;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
        this.detailsRepository = detailsRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void addAdminStartup(ApplicationReadyEvent applicationReadyEvent){
        if (employeeRepository.findByEmpEmail("parveengoel@gmail.com")==null){
            EmployeeDetails defaultAdmin = new EmployeeDetails();
            // Add all necessary details for defaultAdmin
            defaultAdmin.setRole("owner");
            defaultAdmin.setEmpEmail("parveengoel@gmail.com");
            defaultAdmin.setEmpName("Parveen Goel");
            defaultAdmin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            defaultAdmin.setCountry(countryRepository.findById("IND").get());
            defaultAdmin.setState(stateRepository.findById("IN-HR").get());
            defaultAdmin.setPrimaryPhone("7027770150");
            defaultAdmin.setAddress("Karnal");
            defaultAdmin.setCity("Karnal");
            defaultAdmin.setPincode("");
            defaultAdmin.setStatus('y');
            employeeRepository.save(defaultAdmin);
            userAuthRepository.save(new UserDetails("parveengoel@gmail.com", new BCryptPasswordEncoder().encode("admin"), 1, "owner", "7027770150"));
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

    @EventListener(ApplicationReadyEvent.class)
    public void addCashParty(ApplicationReadyEvent applicationReadyEvent){
        PartyDetails partyDetails = new PartyDetails();
        partyDetails.setAddress("Cash Counter");
        partyDetails.setContactPerson("Cash Counter");
        partyDetails.setCity("Cash Counter");
        partyDetails.setDiscount(0);
        partyDetails.setPartyType(partyTypeService.getType(1));
        partyDetails.setCountry(countryRepository.findById("IND").get());
        partyDetails.setState(stateRepository.findById("IN-HR").get());
        partyDetails.setPrimaryPhone("1234567890");
        partyDetails.setPincode("");
        partyDetails.setStatus('y');
        partyDetails.setPartyEmail("cashcounter@na.com");
        partyDetails.setPassword(new BCryptPasswordEncoder().encode("cashcounter"));
        detailsRepository.save(partyDetails);
    }
}
