package com.app.shop.services.employee;

import com.app.shop.entity.ItemDetails;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.employee.ProductManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

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

    public HashMap<String, Object> deleteProduct(int itemId){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemId);
        if (foundItemDetails!=null){
            foundItemDetails.setStatus('n');
            for (ItemPackingDetails itemPackingDetails: foundItemDetails.getItemPackingDetails())
                itemPackingDetails.setStatus('n');
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;

    }

    public HashMap<String, Object> addPacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : itemDetails.getItemPackingDetails())
                foundItemDetails.getItemPackingDetails().add(itemPackingDetails);
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> deletePacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : foundItemDetails.getItemPackingDetails()){
                if (itemPackingDetails.getSize() == itemDetails.getItemPackingDetails().get(0).getSize())
                    itemPackingDetails.setStatus('n');
            }
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> listProducts(){
        returnObject = new HashMap<>();
        List<ItemDetails> itemDetailsList =  productManagementRepository.findAll();
        returnObject.put("data", itemDetailsList);
        return returnObject;
    }
}
