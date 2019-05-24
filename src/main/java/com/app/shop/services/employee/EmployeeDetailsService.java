package com.app.shop.services.employee;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.repository.employee.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;

@Service
public class EmployeeDetailsService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    EmployeeRepository employeeRepository;
    HashMap<String, Object> returnObject = new HashMap<>();
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private void detachObject(EmployeeDetails employeeDetails){
        entityManager.detach(employeeDetails);
    }

    public HashMap<String, Object> addNewEmployee(EmployeeDetails employeeDetails){
        EmployeeDetails foundEmployee = employeeRepository.findByEmail(employeeDetails.getEmpEmail());
        if (foundEmployee==null){
            employeeDetails.setPassword(bCryptPasswordEncoder.encode(employeeDetails.getPassword()));
            employeeRepository.save(employeeDetails);
            detachObject(employeeDetails);
            employeeDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", employeeDetails);
        }
        else {
            returnObject.put("message", "employee already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }
}
