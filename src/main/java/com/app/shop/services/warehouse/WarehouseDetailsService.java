package com.app.shop.services.warehouse;

import com.app.shop.entity.PartyDetails;
import com.app.shop.entity.UserDetails;
import com.app.shop.entity.WarehouseDetails;
import com.app.shop.repository.common.CountryRepository;
import com.app.shop.repository.common.StateRepository;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.warehouse.WarehouseRepository;
import com.app.shop.utils.ChangePasswordClass;
import com.app.shop.utils.GeneratePassword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class WarehouseDetailsService {


    private WarehouseRepository warehouseRepository;
    private UserAuthRepository userAuthRepository;
    @PersistenceContext
    private EntityManager entityManager;
    private HashMap<String, Object> returnObject;
    private PasswordEncoder bCryptPasswordEncoder;
    private CountryRepository countryRepository;
    private StateRepository stateRepository;

    public WarehouseDetailsService(WarehouseRepository warehouseRepository, UserAuthRepository userAuthRepository, PasswordEncoder bCryptPasswordEncoder, CountryRepository countryRepository, StateRepository stateRepository) {
        this.warehouseRepository = warehouseRepository;
        this.userAuthRepository = userAuthRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
    }

    private void detachObject(WarehouseDetails warehouseDetails){
        entityManager.detach(warehouseDetails);
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addNewWarehouse(WarehouseDetails warehouseDetails){
        returnObject = new HashMap<>();
        WarehouseDetails foundWarehouse = warehouseRepository.findByWarehouseEmail(warehouseDetails.getWarehouseEmail());
        if (foundWarehouse==null){
            String encodedPassword = bCryptPasswordEncoder.encode(warehouseDetails.getPassword());
            warehouseDetails.setPassword(encodedPassword);
            warehouseDetails.setStatus('y');
            warehouseDetails.setState(stateRepository.findById(warehouseDetails.getState().getStateFullCode()).get());
            warehouseDetails.setCountry(countryRepository.findById(warehouseDetails.getCountry().getCountryCode3()).get());
            warehouseRepository.save(warehouseDetails);
            userAuthRepository.save(new UserDetails(warehouseDetails.getWarehouseEmail(), encodedPassword, 1, warehouseDetails.getRole(), warehouseDetails.getPrimaryPhone()));
            returnObject.put("message", "success");
        }
        else {
            returnObject.put("message", "warehouse already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> updateWarehouseDetails(WarehouseDetails warehouseDetails) {
        returnObject = new HashMap<>();
        WarehouseDetails foundWarehouseDetails = warehouseRepository.findByWarehouseEmail(warehouseDetails.getWarehouseEmail());
        if (foundWarehouseDetails!=null){
            foundWarehouseDetails.updateDetails(warehouseDetails);
            warehouseRepository.save(foundWarehouseDetails);
            detachObject(foundWarehouseDetails);
            foundWarehouseDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", foundWarehouseDetails);
        }
        else {
            returnObject.put("message", "failure");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> deleteWarehouse(String email) {
        returnObject = new HashMap<>();
        WarehouseDetails foundWarehouseDetails = warehouseRepository.findByWarehouseEmail(email);
        if (foundWarehouseDetails!=null){
            foundWarehouseDetails.setStatus('n');
            warehouseRepository.save(foundWarehouseDetails);
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
        WarehouseDetails foundWarehouseDetails = warehouseRepository.findByWarehouseEmail(object.getEmail());
        if (foundWarehouseDetails!=null && bCryptPasswordEncoder.matches(object.getOldPassword(), foundWarehouseDetails.getPassword())){
            String encodedPassword = bCryptPasswordEncoder.encode(object.getNewPassword());
            foundWarehouseDetails.setPassword(encodedPassword);
            warehouseRepository.save(foundWarehouseDetails);
            UserDetails userDetails = userAuthRepository.findByUsername(object.getEmail());
            userDetails.setPassword(encodedPassword);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public String verify(String email) {
        WarehouseDetails foundWarehouseDetails = warehouseRepository.findByWarehouseEmail(email);
        if (foundWarehouseDetails!=null){
            foundWarehouseDetails.setStatus('y');
            warehouseRepository.save(foundWarehouseDetails);
            return "Successfully Verified";
        }
        return "Invalid Request";
    }

    public WarehouseDetails getDetails(int warehouseId) {
        return warehouseRepository.findById(warehouseId).get();
    }

    public HashMap<String, Object> getNames() {
        returnObject = new HashMap<>();
        returnObject.put("data", warehouseRepository.getNames());
        return returnObject;
    }

    public HashMap<String, Object> getWarehouseDetails(Integer warehouseId){
        returnObject = new HashMap<>();
        WarehouseDetails warehouseDetails = warehouseRepository.findByWarehouseId(warehouseId);
        if (warehouseDetails!=null){
            detachObject(warehouseDetails);
            warehouseDetails.setPassword("");
            returnObject.put("message", "success");
            returnObject.put("data", warehouseDetails);
            return returnObject;
        }
        returnObject.put("message", "no such warehouse exists");
        return returnObject;
    }

    public HashMap<String, Object> getWarehouseDetails(String email) {
        returnObject = new HashMap<>();
        WarehouseDetails warehouseDetails = warehouseRepository.findByWarehouseEmail(email);
        if (warehouseDetails == null){
            warehouseDetails = warehouseRepository.findByPrimaryPhone(email);
        }
        if (warehouseDetails!=null){
            detachObject(warehouseDetails);
            warehouseDetails.setPassword("");
            returnObject.put("message", "success");
            returnObject.put("data", warehouseDetails);
            return returnObject;
        }
        returnObject.put("message", "no such warehouse exists");
        return returnObject;
    }

    public HashMap<String, Object> search(String query){
        returnObject = new HashMap<>();
        returnObject.put("data", warehouseRepository.findByWarehouseNameContaining(query));
        return returnObject;
    }

    public HashMap<String, Object> getByState(String state) {
        returnObject = new HashMap<>();
        List<Object> warehouseList = warehouseRepository.findByState(state.toLowerCase());
        returnObject.put("data", warehouseList);
        return returnObject;
    }

    public HashMap<String, Object> getDynamic(Integer warehouseId) {
        returnObject = new HashMap<>();
        List<Object[]> dynamic = warehouseRepository.findDynamic(warehouseId);
        returnObject.put("message", "success");
        returnObject.put("data", dynamic);
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> forgotPassword(String email) {
        returnObject = new HashMap<>();
        WarehouseDetails found = warehouseRepository.findByWarehouseEmail(email);
        if (found!=null){
            String generatedPassword = new GeneratePassword().generatePassword();
            String encodedPassword = bCryptPasswordEncoder.encode(generatedPassword);
            found.setPassword(encodedPassword);
            warehouseRepository.save(found);
            UserDetails userDetails = userAuthRepository.findByUsername(email);
            userDetails.setPassword(encodedPassword);
            userAuthRepository.save(userDetails);
            // TODO Send mail with this new password
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }
}
