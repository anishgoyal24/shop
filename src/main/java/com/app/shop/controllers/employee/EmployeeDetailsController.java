package com.app.shop.controllers.employee;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeDetailsController {

    @Autowired
    private EmployeeDetailsService employeeDetailsService;

    @PostMapping(value = "new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addNewEmployee(@RequestBody EmployeeDetails employeeDetails){
        return employeeDetailsService.addNewEmployee(employeeDetails);
    }

    @PostMapping(value = "/updatedetails")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> updateDetails(@RequestBody EmployeeDetails employeeDetails){
        return employeeDetailsService.updateEmployeeDetails(employeeDetails);
    }

    @PostMapping(value = "/changepassword")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object){
        return employeeDetailsService.changePassword(object);
    }

    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getList(){
        return employeeDetailsService.getList();
    }

    @PostMapping(value = "/changerole")
    @PreAuthorize("hasAnyAuthority('ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> changeRole(@RequestBody Map<String, String> request){
        return employeeDetailsService.updateRole(request.get("email"), request.get("role"));
    }
}
