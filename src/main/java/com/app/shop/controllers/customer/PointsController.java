package com.app.shop.controllers.customer;

import com.app.shop.entity.PartyPoints;
import com.app.shop.services.customer.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/points")
public class PointsController {

    @Autowired
    private PointsService pointsService;

    @PostMapping(value = "/add")
    public HashMap<String, Object> add(@RequestBody PartyPoints partyPoints){
        return pointsService.addTransaction(partyPoints);
    }

    @GetMapping(value = "/history")
    public HashMap<String, Object> history(@PathVariable int partyId){
        return pointsService.seeHistory(partyId);
    }

    @GetMapping(value = "/get")
    public HashMap<String, Object> getPoints(@PathVariable int partyId){
        return pointsService.getPoints(partyId);
    }
}
