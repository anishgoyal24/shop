package com.app.shop.services.employee;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.entity.HashTable;
import com.app.shop.repository.common.HashRepository;
import com.app.shop.repository.employee.EmployeeRepository;
import com.app.shop.utils.ChangePasswordClass;
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
    private HashRepository hashRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    private HashMap<String, Object> returnObject;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private void detachObject(EmployeeDetails employeeDetails){
        entityManager.detach(employeeDetails);
    }

    public HashMap<String, Object> addNewEmployee(EmployeeDetails employeeDetails){
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployee = employeeRepository.findByEmpEmail(employeeDetails.getEmpEmail());
        if (foundEmployee==null){
            employeeDetails.setPassword(bCryptPasswordEncoder.encode(employeeDetails.getPassword()));
            employeeDetails.setStatus('n');
            employeeRepository.save(employeeDetails);
            detachObject(employeeDetails);
            employeeDetails.setPassword(null);
            String encodedEmail = bCryptPasswordEncoder.encode(employeeDetails.getEmpEmail());
            hashRepository.save(new HashTable(employeeDetails.getEmpEmail(),encodedEmail));
            returnObject.put("message", "success");
            returnObject.put("data", employeeDetails);
        }
        else {
            returnObject.put("message", "employee already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> updateEmployeeDetails(EmployeeDetails employeeDetails) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(employeeDetails.getEmpEmail());
        if (foundEmployeeDetails!=null){
            foundEmployeeDetails.updateDetails(employeeDetails);
            employeeRepository.save(foundEmployeeDetails);
            detachObject(foundEmployeeDetails);
            foundEmployeeDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", foundEmployeeDetails);
        }
        else {
            returnObject.put("message", "failure");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> deleteEmployee(String email) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(email);
        if (foundEmployeeDetails!=null){
            foundEmployeeDetails.setStatus('n');
            employeeRepository.save(foundEmployeeDetails);
            returnObject.put("message", "deleted successfully");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> changePassword(ChangePasswordClass object) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(object.getEmail());
        if (foundEmployeeDetails!=null && bCryptPasswordEncoder.matches(object.getOldPassword(), foundEmployeeDetails.getPassword())){
            foundEmployeeDetails.setPassword(bCryptPasswordEncoder.encode(object.getNewPassword()));
            employeeRepository.save(foundEmployeeDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public String verify(String email) {
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(email);
        if (foundEmployeeDetails!=null){
            foundEmployeeDetails.setStatus('y');
            employeeRepository.save(foundEmployeeDetails);
            return "Successfully Verified";
        }
        return "Invalid Request";
    }
}
