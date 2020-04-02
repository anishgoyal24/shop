package com.app.shop.controllers.employee;

import com.app.shop.entity.PartyType;
import com.app.shop.services.employee.PartyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller for party type
@RestController
@RequestMapping(value = "/party")
public class PartyTypeController {

    private PartyTypeService partyTypeService;

    @Autowired
    public PartyTypeController(PartyTypeService partyTypeService) {
        this.partyTypeService = partyTypeService;
    }

//  New party type
    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addPartyType(@RequestBody PartyType partyType){
        return partyTypeService.addPartyType(partyType);
    }

//  Delete party type
    @PostMapping(value = "/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> deletePartyType(@PathVariable Integer id){
        return partyTypeService.deletePartyType(id);
    }

//  List party types
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getPartyTypes(){
        return partyTypeService.listAll();
    }

//  Enable party type
    @PostMapping(value = "/enable/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> enablePartyType(@PathVariable Integer id){ return partyTypeService.enablePartyType(id); }
}
