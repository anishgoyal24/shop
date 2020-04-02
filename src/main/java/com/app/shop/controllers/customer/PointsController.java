package com.app.shop.controllers.customer;

import com.app.shop.entity.PartyPoints;
import com.app.shop.services.customer.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller for points
@RestController
@RequestMapping(value = "/points")
public class PointsController {

    private PointsService pointsService;

    @Autowired
    public PointsController(PointsService pointsService) {
        this.pointsService = pointsService;
    }

//  Award points to a user on a certain order
    @PostMapping(value = "/add")
    public HashMap<String, Object> add(@RequestBody PartyPoints partyPoints){
        return pointsService.addTransaction(partyPoints);
    }

//  Get points history of a user
    @GetMapping(value = "/history")
    @PreAuthorize("hasAnyAuthority('ROLE_party', 'ROLE_employee')")
    public HashMap<String, Object> history(@PathVariable int partyId){
        return pointsService.seeHistory(partyId);
    }


//  Get points for a certain user
    @GetMapping(value = "/get")
    @PreAuthorize("hasAnyAuthority('ROLE_party', 'ROLE_employee')")
    public HashMap<String, Object> getPoints(@PathVariable int partyId){
        return pointsService.getPoints(partyId);
    }
}
