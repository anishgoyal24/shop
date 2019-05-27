package com.app.shop.services.customer;

import com.app.shop.entity.ItemDetails;
import com.app.shop.repository.customer.ProductRepository;
import com.app.shop.repository.customer.CustomerStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    private HashMap<String, Object> returnObject;
    @Autowired
    private CustomerStockRepository customerStockRepository;
    public HashMap<String, Object> searchItem(String searchQuery){
        returnObject = new HashMap<>();
        List<ItemDetails> itemDetailsList = productRepository.findByItemNameContainingIgnoreCase(searchQuery);
        if (itemDetailsList!=null){
            returnObject.put("message", "success");
            returnObject.put("data", itemDetailsList);
        }
        else
            returnObject.put("message", "no such item");
        return returnObject;
    }

    public HashMap retrieveItem(Integer itemId, String state){
        System.out.println(customerStockRepository.findStockAndPrice(state, itemId));
        return null;
    }
}
