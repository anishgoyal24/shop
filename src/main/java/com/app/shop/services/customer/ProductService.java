package com.app.shop.services.customer;

import com.app.shop.entity.ItemDetails;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.customer.DiscountRepository;
import com.app.shop.repository.customer.ProductRepository;
import com.app.shop.repository.customer.PartyStockRepository;
import com.app.shop.utils.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    private HashMap<String, Object> returnObject;
    @Autowired
    private PartyStockRepository partyStockRepository;
    @Autowired
    private DiscountRepository discountRepository;

    public HashMap<String, Object> searchItem(String searchQuery, String type){
        returnObject = new HashMap<>();
        List<ItemDetails> itemDetailsList = productRepository.findByItemNameContainingIgnoreCase(searchQuery, type);
        if (itemDetailsList!=null){
            List<ProductDTO> productDTOS = new ArrayList<>();
            returnObject.put("message", "success");
            for (ItemDetails itemDetails: itemDetailsList){
                productDTOS.add(new ProductDTO(itemDetails, itemDetails.getItemPackingDetails()));
            }
            returnObject.put("data", productDTOS);
        }
        else
            returnObject.put("message", "no such item");
        return returnObject;
    }

    public HashMap retrieveItem(Integer itemId, String state){
        returnObject = new HashMap<>();
        Object[][] objects = partyStockRepository.findStockAndPrice(state, itemId);
        if (objects.length>0 && objects!=null){
            if ((long)objects[0][0]>0) {
                returnObject.put("data", productRepository.findById(itemId));
                returnObject.put("message", "success");
                returnObject.put("itemId", itemId);
                returnObject.put("stock", objects[0][0]);
                returnObject.put("price", objects[0][1]);
            }
            else
                returnObject.put("message", "Out of stock");
        }
        else
            returnObject.put("message", "Not available in your area");
        return returnObject;
    }

    public HashMap<String, Object> getDiscount(Integer itemId){
        returnObject = new HashMap<>();
        float discount = discountRepository.findExistingDiscount(itemId).getDiscount();
        if (discount>=0)
            returnObject.put("discount", discount);
        else
            returnObject.put("discount", 0);
        return returnObject;
    }

    public HashMap<String, Object> listProducts(String type) {
        returnObject = new HashMap<>();
        List<ItemDetails> items = productRepository.findByCustomerAllowedAndStatus(type, 'y');
        if (items!=null){
            for (ItemDetails itemDetails : items){
                itemDetails.getItemPackingDetails().removeIf(itemPackingDetails -> itemPackingDetails.getStatus() == 'n');
            }
            returnObject.put("message", "success");
            returnObject.put("data", items);
        }
        else returnObject.put("message", "no products");
        return returnObject;
    }
}
