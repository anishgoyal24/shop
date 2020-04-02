package com.app.shop.services.warehouse;

import com.app.shop.entity.UserDetails;
import com.app.shop.entity.WarehouseDetails;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.warehouse.WarehouseRepository;
import com.app.shop.utils.ChangePasswordClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;

@Service
public class WarehouseDetailsService {

    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private UserAuthRepository userAuthRepository;
    @PersistenceContext
    private EntityManager entityManager;
    private HashMap<String, Object> returnObject;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    private void detachObject(WarehouseDetails warehouseDetails){
        entityManager.detach(warehouseDetails);
    }

    public HashMap<String, Object> addNewWarehouse(WarehouseDetails warehouseDetails){
        returnObject = new HashMap<>();
        WarehouseDetails foundEmployee = warehouseRepository.findByWarehouseEmail(warehouseDetails.getWarehouseEmail());
        if (foundEmployee==null){
            String encodedPassword = bCryptPasswordEncoder.encode(warehouseDetails.getPassword());
            warehouseDetails.setPassword(encodedPassword);
            warehouseDetails.setStatus('y');
            warehouseRepository.save(warehouseDetails);
            detachObject(warehouseDetails);
            userAuthRepository.save(new UserDetails(warehouseDetails.getWarehouseEmail(), encodedPassword, 1, warehouseDetails.getRole()));
            warehouseDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", warehouseDetails);
        }
        else {
            returnObject.put("message", "warehouse already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

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
}
