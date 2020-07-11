package com.app.shop.controllers.common;

import com.app.shop.utils.CountryStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/common")
public class CountryStateController {

    private CountryStateService countryStateService;

    @Autowired
    public CountryStateController(CountryStateService countryStateService) {
        this.countryStateService = countryStateService;
    }

    @GetMapping(value = "/states")
    @PreAuthorize("hasAnyAuthority('ROLE_ANONYMOUS', 'ROLE_party', 'ROLE_employee', 'ROLE_owner', 'ROLE_admin', 'ROLE_warehouse', 'ROLE_manager')")
    public HashMap<String, Object> getStates(@RequestParam("country") String country){
        return countryStateService.getStates(country);
    }

    @GetMapping(value = "/country")
    @PreAuthorize("hasAnyAuthority('ROLE_ANONYMOUS', 'ROLE_party', 'ROLE_employee', 'ROLE_owner', 'ROLE_admin', 'ROLE_warehouse', 'ROLE_manager')")
    public HashMap<String, Object> getCountries(){
        return countryStateService.getCountries();
    }
}
