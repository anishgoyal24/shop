package com.app.shop.controllers.employee;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.services.employee.EmployeeDetailsService;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// Controller for employee details
@RestController
@RequestMapping(value = "/employee")
public class EmployeeDetailsController {

    private EmployeeDetailsService employeeDetailsService;

    @Autowired
    public EmployeeDetailsController(EmployeeDetailsService employeeDetailsService) {
        this.employeeDetailsService = employeeDetailsService;
    }

//  Add an employee
    @PostMapping(value = "new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addNewEmployee(@RequestBody EmployeeDetails employeeDetails){
        return employeeDetailsService.addNewEmployee(employeeDetails);
    }

//  Update employee Details
    @PostMapping(value = "/updatedetails")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> updateDetails(@RequestBody EmployeeDetails employeeDetails){
        return employeeDetailsService.updateEmployeeDetails(employeeDetails);
    }

//  Change password of a employee
    @PostMapping(value = "/changepassword")
    @PreAuthorize(value = "hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> changePassword(@RequestBody ChangePasswordClass object){
        return employeeDetailsService.changePassword(object);
    }

//  List all employees
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getList(){
        return employeeDetailsService.getList();
    }

//  Change role of an employee
    @PostMapping(value = "/changerole")
    @PreAuthorize("hasAnyAuthority('ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> changeRole(@RequestBody Map<String, String> request){
        return employeeDetailsService.updateRole(request.get("email"), request.get("role"));
    }

//  Change status of a employee
    @PostMapping(value = "/changestatus")
    @PreAuthorize("hasAnyAuthority('ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> statusEmployee(@RequestBody Map<String, String> request){
        return employeeDetailsService.changeStatus(request.get("email"), request.get("status"));
    }
}
