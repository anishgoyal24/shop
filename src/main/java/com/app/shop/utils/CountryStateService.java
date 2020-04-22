package com.app.shop.utils;

import com.app.shop.entity.Country;
import com.app.shop.entity.State;
import com.app.shop.repository.common.CountryRepository;
import com.app.shop.repository.common.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CountryStateService {

    private CountryRepository countryRepository;
    private StateRepository stateRepository;
    private HashMap<String, Object> returnObject;

    @Autowired
    public CountryStateService(CountryRepository countryRepository, StateRepository stateRepository) {
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
    }

    public HashMap<String, Object> getStates(String country){
        List<State> states = stateRepository.findByCountryCode3(country);
        returnObject = new HashMap<>();
        returnObject.put("data", states);
        return returnObject;
    }

    public HashMap<String, Object> getCountries(){
        List<Country> countries = countryRepository.findAll();
        returnObject = new HashMap<>();
        returnObject.put("data", countries);
        return returnObject;
    }

}
