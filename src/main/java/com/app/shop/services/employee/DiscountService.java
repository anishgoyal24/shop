package com.app.shop.services.employee;

import com.app.shop.entity.Discount;
import com.app.shop.repository.customer.DiscountRepository;
import com.app.shop.services.customer.ItemPackingDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class DiscountService {

    @Autowired
    private DiscountRepository discountRepository;
    private HashMap<String, Object> returnObject;
    @Autowired
    private ItemPackingDetailsService itemPackingDetailsService;

    public HashMap<String, Object> listAll(){
        returnObject = new HashMap<>();
        List<Discount> discounts = discountRepository.findAll();
        returnObject.put("message", "success");
        returnObject.put("data", discounts);
        return returnObject;
    }

    public HashMap<String, Object> addDiscount(Discount discount){
        returnObject = new HashMap<>();
        Discount foundDiscount = discountRepository.findExistingDiscount(discount.getItemPackingDetails().getId());
        if (foundDiscount==null){
            discount.setItemPackingDetails(itemPackingDetailsService.getDetails(discount.getItemPackingDetails().getId()));
            discountRepository.save(discount);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "already exists");
        return returnObject;
    }

    public HashMap<String, Object> updateDiscount(Discount discount){
        returnObject = new HashMap<>();
        Discount foundDiscount = discountRepository.findExistingDiscount(discount.getItemPackingDetails().getId());
        if (foundDiscount!=null){
            foundDiscount.setDiscount(discount.getDiscount());
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> deleteDiscount(Integer id){
        returnObject = new HashMap<>();
        if (discountRepository.findById(id).isPresent()){
            Discount discount = discountRepository.findById(id).get();
            discount.setStatus('n');
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }
}
