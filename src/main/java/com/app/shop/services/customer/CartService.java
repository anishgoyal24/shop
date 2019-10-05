package com.app.shop.services.customer;

import com.app.shop.entity.Cart;
import com.app.shop.repository.customer.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> addItem(Cart cart){
        returnObject = new HashMap<>();
        Cart foundItem = cartRepository.findByPartyDetailsPartyIdAndItemPackingDetailsId(cart.getPartyDetails().getPartyId(), cart.getItemPackingDetails().getId());
        if (foundItem==null){
            cartRepository.save(cart);
        }
        else {
            foundItem.setQuantity(foundItem.getQuantity() + cart.getQuantity());
            cartRepository.save(foundItem);
        }
        returnObject.put("message", "success");
        returnObject.put("cart", cartRepository.findByPartyDetailsPartyId(cart.getPartyDetails().getPartyId()));
        return returnObject;
    }

    public HashMap<String, Object> deleteItem(Cart cart){
        returnObject = new HashMap<>();
        Cart found = cartRepository.findByPartyDetailsPartyIdAndItemPackingDetailsId(cart.getPartyDetails().getPartyId(), cart.getItemPackingDetails().getId());
        if (found!=null){
            if (found.getQuantity() > cart.getQuantity()){
                found.setQuantity(found.getQuantity() - cart.getQuantity());
                cartRepository.save(found);
                returnObject.put("data", found);
            }
            else
                cartRepository.delete(cart);
            returnObject.put("message", "success");
        }
        else {
            returnObject.put("message", "failure");
        }
        return returnObject;
    }

    public HashMap<String, Object> getCart(String username){
        returnObject = new HashMap<>();
        List<Cart> cart = cartRepository.findByPartyDetailsPartyEmail(username);
        returnObject.put("message", "success");
        returnObject.put("data", cart);
        return returnObject;
    }
}
