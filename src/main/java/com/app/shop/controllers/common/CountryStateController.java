package com.app.shop.controllers.common;

import com.app.shop.utils.CountryStateService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public HashMap<String, Object> getStates(@RequestParam("country") String country){
        return countryStateService.getStates(country);
    }

    @GetMapping(value = "/country")
    public HashMap<String, Object> getCountries(){
        return countryStateService.getCountries();
    }
}
