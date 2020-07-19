package com.app.shop.controllers.customer;

import com.app.shop.entity.PartyDetails;
import com.app.shop.services.customer.PartyDetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import java.util.HashMap;
import java.util.Map;

// Controller for customer details
@RestController
@RequestMapping(value = "/customer")
public class CustomerDetailsController {

    private PartyDetailsService partyDetailsService;

    @Autowired
    public CustomerDetailsController(PartyDetailsService partyDetailsService){
        this.partyDetailsService = partyDetailsService;
    }

//  Add new party
    @PostMapping(value = "/new")
    public HashMap<String, Object> addUser(@RequestBody PartyDetails partyDetails){
        return partyDetailsService.addNewUser(partyDetails);
    }

//  Update details of a user
    @PostMapping(value = "/updatedetails")
    @PreAuthorize("hasAnyAuthority('ROLE_party', 'ROLE_employee', 'ROLE_owner', 'ROLE_admin')")
    public HashMap<String, Object> updateDetails(@RequestBody PartyDetails partyDetails){
        return partyDetailsService.updateUserDetails(partyDetails);
    }

//  Change password of a user
    @PostMapping(value = "/changepassword")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object){
        return partyDetailsService.changePassword(object);
    }

//  Get discount allowed for a party
    @GetMapping(value = "/getdiscount/{partyId}")
    @PreAuthorize("hasAnyAuthority('ROLE_party', 'ROLE_employee', 'ROLE_owner', 'ROLE_party')")
    public HashMap<String, Object> getDiscount(@PathVariable int partyId){
        return partyDetailsService.getDiscount(partyId);
    }

//  Assign discount to a party
    @PostMapping(value = "/savediscount/{partyId}/{discount}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_owner', 'ROLE_admin')")
    public HashMap<String, Object> saveDiscount(@PathVariable int partyId, @PathVariable float discount){
        return partyDetailsService.addDiscount(partyId, discount);
    }

//  Get details for a party
    @GetMapping(value = "/getdetails")
    @PreAuthorize("hasAnyAuthority('ROLE_party', 'ROLE_employee', 'ROLE_owner', 'ROLE_admin')")
    public HashMap<String, Object> getDetails(@RequestParam String username){
        return partyDetailsService.getDetails(username);
    }

//  Reset password for a user
    @PostMapping(value = "/forgotpassword")
    @PreAuthorize("hasAnyAuthority('ROLE_ANONYMOUS')")
    public HashMap<String, Object> forgotPassword(@RequestBody String phone){
        return partyDetailsService.forgotPassword(phone);
    }

    //  Search for a party
    @GetMapping(value = "/search")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_owner', 'ROLE_admin')")
    public HashMap<String, Object> search(@RequestParam String query){
        return partyDetailsService.search(query);
    }

}
