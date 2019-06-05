package com.app.shop.controllers.common;

import com.app.shop.services.customer.PartyDetailsService;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.services.warehouse.WarehouseDetailsService;
import com.app.shop.utils.AccountVerificationService;
import com.app.shop.utils.WebSocketPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class CommonController {

    @Autowired
    private PartyDetailsService partyDetailsService;
    @Autowired
    private EmployeeDetailsService employeeDetailsService;
    @Autowired
    private WarehouseDetailsService warehouseDetailsService;

    @PostMapping(value = "/verify/{hash}/{type}")
    public String verifyAccount(@PathVariable String hash){
        return new AccountVerificationService().verifyAccount(hash);
    }

    @MessageMapping(value = "/delete")
    @SendTo(value = "/devices/public")
    public HashMap<String, Object> delete(@Payload WebSocketPayload webSocketPayload){
        if (webSocketPayload.getUserType().equalsIgnoreCase("party"))
            return partyDetailsService.deleteUser(webSocketPayload.getUserEmail());
        else if (webSocketPayload.getUserType().equalsIgnoreCase("warehouse"))
            return warehouseDetailsService.deleteWarehouse(webSocketPayload.getUserEmail());
        else if (webSocketPayload.getUserType().equalsIgnoreCase("employee"))
            return employeeDetailsService.deleteEmployee(webSocketPayload.getUserEmail());
        else
            return null;
    }
}
