package com.app.shop.services.employee;

import com.app.shop.entity.ItemDetails;
import com.app.shop.repository.employee.ProductManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class ProductManagementService {

    @Autowired
    private ProductManagementRepository productManagementRepository;
    HashMap<String, Object> returnObject;

    public HashMap<String, Object> addProduct(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        if (productManagementRepository.findByItemName(itemDetails.getItemName())==null) {
            productManagementRepository.save(itemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }
}
