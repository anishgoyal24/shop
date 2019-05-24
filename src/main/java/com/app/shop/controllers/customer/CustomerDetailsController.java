package com.app.shop.controllers.customer;

import com.app.shop.entity.PartyDetails;
import com.app.shop.services.customer.DetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/customer")
public class CustomerDetailsController {

    @Autowired
    DetailsService detailsService;

    @PostMapping(value = "/new")
    public HashMap<String, Object> addUser(@RequestBody PartyDetails partyDetails){
        return detailsService.addNewUser(partyDetails);
    }



    @PostMapping(value = "/updatedetails")
    public HashMap<String, Object> updateDetails(@RequestBody PartyDetails partyDetails){
        return detailsService.updateUserDetails(partyDetails);
    }

    @PostMapping(value = "/delete")
    public HashMap<String, Object> deleteUser(@RequestParam String email){
        return detailsService.deleteUser(email);
    }

    @PostMapping(value = "/changepassword")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object){
        return detailsService.changePassword(object);
    }
}
