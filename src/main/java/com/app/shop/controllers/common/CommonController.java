package com.app.shop.controllers.common;

import com.app.shop.services.customer.PartyDetailsService;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.services.warehouse.WarehouseDetailsService;
import com.app.shop.utils.CountryStateService;
import com.app.shop.utils.WebSocketPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

// ADDING TEST COMMENT
import java.util.HashMap;

@RestController
public class CommonController {

    @Autowired
    private PartyDetailsService partyDetailsService;
    @Autowired
    private EmployeeDetailsService employeeDetailsService;
    @Autowired
    private WarehouseDetailsService warehouseDetailsService;

    @MessageMapping(value = "/delete")
    @SendTo(value = "/devices")
    public WebSocketPayload delete(@Payload WebSocketPayload webSocketPayload){
        HashMap<String, Object> response = new HashMap<>();
        WebSocketPayload returnPayload = new WebSocketPayload();
        if (webSocketPayload.getUserType().equalsIgnoreCase("party"))
             response = partyDetailsService.deleteUser(webSocketPayload.getUserEmail());
        else if (webSocketPayload.getUserType().equalsIgnoreCase("warehouse"))
            response = warehouseDetailsService.deleteWarehouse(webSocketPayload.getUserEmail());
        else if (webSocketPayload.getUserType().equalsIgnoreCase("employee"))
            response =  employeeDetailsService.deleteEmployee(webSocketPayload.getUserEmail());
        if (((String)response.get("message")).equalsIgnoreCase("success")){
            returnPayload.setMessage("delete");
            returnPayload.setUserEmail((String)response.get("email"));
            return returnPayload;
        }
        else
            return null;
    }
}
