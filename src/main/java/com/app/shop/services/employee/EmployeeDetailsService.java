package com.app.shop.services.employee;

import com.app.shop.entity.EmployeeDetails;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.CountryRepository;
import com.app.shop.repository.common.StateRepository;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.employee.EmployeeRepository;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Optional;

@Service
public class EmployeeDetailsService {

    @PersistenceContext
    private EntityManager entityManager;
    private EmployeeRepository employeeRepository;
    private UserAuthRepository userAuthRepository;
    private HashMap<String, Object> returnObject;
    private PasswordEncoder bCryptPasswordEncoder;
    private StateRepository stateRepository;
    private CountryRepository countryRepository;

    @Autowired
    public EmployeeDetailsService(EmployeeRepository employeeRepository, UserAuthRepository userAuthRepository, PasswordEncoder bCryptPasswordEncoder, StateRepository stateRepository, CountryRepository countryRepository) {
        this.employeeRepository = employeeRepository;
        this.userAuthRepository = userAuthRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.stateRepository = stateRepository;
        this.countryRepository = countryRepository;
    }

    private void detachObject(EmployeeDetails employeeDetails){
        entityManager.detach(employeeDetails);
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addNewEmployee(EmployeeDetails employeeDetails){
        returnObject = new HashMap<>();
        if (employeeDetails.getRole().equalsIgnoreCase("owner")){
            returnObject.put("message", "invalid role");
            return returnObject;
        }
        EmployeeDetails foundEmployee = employeeRepository.findByEmpEmail(employeeDetails.getEmpEmail());
        if (foundEmployee==null){
            String encodedPassword = bCryptPasswordEncoder.encode(employeeDetails.getPassword());
            employeeDetails.setPassword(encodedPassword);
            employeeDetails.setStatus('y');
            employeeDetails.setState(stateRepository.findById(employeeDetails.getState().getStateFullCode()).get());
            employeeDetails.setCountry(countryRepository.findById(employeeDetails.getCountry().getCountryCode3()).get());
            employeeRepository.save(employeeDetails);
            userAuthRepository.save(new UserDetails(employeeDetails.getEmpEmail(), encodedPassword, 1, employeeDetails.getRole(), employeeDetails.getPrimaryPhone()));
            returnObject.put("message", "success");
        }
        else {
            returnObject.put("message", "employee already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
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

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> deleteEmployee(String email) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(email);
        if (foundEmployeeDetails!=null){
            foundEmployeeDetails.setStatus('n');
            employeeRepository.save(foundEmployeeDetails);
            UserDetails userDetails = userAuthRepository.findByUsername(email);
            userDetails.setEnabled(0);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "deleted successfully");
            returnObject.put("email", email);
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> changePassword(ChangePasswordClass object) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(object.getEmail());
        if (foundEmployeeDetails!=null && bCryptPasswordEncoder.matches(object.getOldPassword(), foundEmployeeDetails.getPassword())){
            String encodedPassword = bCryptPasswordEncoder.encode(object.getNewPassword());
            foundEmployeeDetails.setPassword(encodedPassword);
            employeeRepository.save(foundEmployeeDetails);
            UserDetails userDetails = userAuthRepository.findByUsername(object.getEmail());
            userDetails.setPassword(encodedPassword);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> getList() {
        returnObject = new HashMap<>();
        returnObject.put("data", employeeRepository.findAll());
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> updateRole(String email, String role){
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployee = employeeRepository.findByEmpEmail(email);
        if (foundEmployee!=null){
            foundEmployee.setRole(role);
            employeeRepository.save(foundEmployee);
            returnObject.put("message", "success");
            returnObject.put("role", role);
        }
        else{
            returnObject.put("message", "no such employee");
        }
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> changeStatus(String email, String status) {
        returnObject = new HashMap<>();
        EmployeeDetails foundEmployee = employeeRepository.findByEmpEmail(email);
        if (foundEmployee != null){
            foundEmployee.setStatus(status.charAt(0));
            employeeRepository.save(foundEmployee);
            UserDetails userDetails = userAuthRepository.findByUsername(email);
            if (userDetails==null){
                userDetails = userAuthRepository.findByPrimaryPhone(email);
            }
            if (status.equals("y"))userDetails.setEnabled(1);
            else if (status.equals("n"))userDetails.setEnabled(0);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "success");
        }
        else returnObject.put("message", "no such user");
        return returnObject;
    }

    public HashMap<String, Object> getDetails(String username) {
        EmployeeDetails employeeDetails = employeeRepository.findByEmpEmail(username);
        if (employeeDetails==null) employeeDetails = employeeRepository.findByPrimaryPhone(username);
        returnObject = new HashMap<>();
        if (employeeDetails!=null){
            returnObject.put("message", "found");
            returnObject.put("data", employeeDetails);
        }
        else returnObject.put("message", "not found");
        return returnObject;
    }

//    public String verify(String email) {
//        EmployeeDetails foundEmployeeDetails = employeeRepository.findByEmpEmail(email);
//        if (foundEmployeeDetails!=null){
//            foundEmployeeDetails.setStatus('y');
//            employeeRepository.save(foundEmployeeDetails);
//            return "Successfully Verified";
//        }
//        return "Invalid Request";
//    }
}
