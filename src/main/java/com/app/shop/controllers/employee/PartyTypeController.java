package com.app.shop.controllers.employee;

import com.app.shop.entity.PartyType;
import com.app.shop.services.employee.PartyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/party")
public class PartyTypeController {

    @Autowired
    private PartyTypeService partyTypeService;

    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addPartyType(@RequestBody PartyType partyType){
        return partyTypeService.addPartyType(partyType);
    }

    @PostMapping(value = "/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> deletePartyType(@PathVariable Integer id){
        return partyTypeService.deletePartyType(id);
    }

    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getPartyTypes(){
        return partyTypeService.listAll();
    }

    @PostMapping(value = "/enable/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> enablePartyType(@PathVariable Integer id){ return partyTypeService.enablePartyType(id); }
}
