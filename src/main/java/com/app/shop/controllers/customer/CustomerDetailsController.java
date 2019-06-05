package com.app.shop.controllers.customer;

import com.app.shop.entity.PartyDetails;
import com.app.shop.services.customer.PartyDetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/customer")
public class CustomerDetailsController {

    @Autowired
    private PartyDetailsService partyDetailsService;

    @PostMapping(value = "/new")
    public HashMap<String, Object> addUser(@RequestBody PartyDetails partyDetails){
        return partyDetailsService.addNewUser(partyDetails);
    }

    @PostMapping(value = "/updatedetails")
    public HashMap<String, Object> updateDetails(@RequestBody PartyDetails partyDetails){
        return partyDetailsService.updateUserDetails(partyDetails);
    }

    @PostMapping(value = "/changepassword")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object){
        return partyDetailsService.changePassword(object);
    }

    @GetMapping(value = "/getdiscount")
    public HashMap<String, Object> getDiscount(@PathVariable int partyId){
        return partyDetailsService.getDiscount(partyId);
    }

    @PostMapping(value = "/savediscount")
    public HashMap<String, Object> saveDiscount(@PathVariable int partyId, float discount){
        return partyDetailsService.addDiscount(partyId, discount);
    }
}
