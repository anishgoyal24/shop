package com.app.shop.services.customer;

import com.app.shop.entity.Cart;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.entity.PartyDetails;
import com.app.shop.repository.customer.CartRepository;
import com.app.shop.services.warehouse.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class CartService {

    private CartRepository cartRepository;
    private HashMap<String, Object> returnObject;
    private StockService stockService;
    private PartyDetailsService partyDetailsService;
    private ItemPackingDetailsService itemPackingDetailsService;

    @Autowired
    public CartService(CartRepository cartRepository, StockService stockService, PartyDetailsService partyDetailsService, ItemPackingDetailsService itemPackingDetailsService) {
        this.cartRepository = cartRepository;
        this.stockService = stockService;
        this.partyDetailsService = partyDetailsService;
        this.itemPackingDetailsService = itemPackingDetailsService;
    }

//  Add item to a cart
    public HashMap<String, Object> addItem(Cart cart){
        returnObject = new HashMap<>();
//      Check if item is already present in cart
        Cart foundItem = cartRepository.findByPartyDetailsPartyIdAndItemPackingDetailsId(cart.getPartyDetails().getPartyId(), cart.getItemPackingDetails().getId());
        if (foundItem==null){
//          Not present then add
            cart.setPartyDetails((PartyDetails)partyDetailsService.getDetails(cart.getPartyDetails().getPartyEmail()).get("data"));
            cart.setItemPackingDetails(itemPackingDetailsService.getDetails(cart.getItemPackingDetails().getId()));
            cartRepository.save(cart);
        }
        else {
//          Item already present in cart. Update quantity
            foundItem.setQuantity(foundItem.getQuantity() + cart.getQuantity());
            cartRepository.save(foundItem);
        }
        returnObject.put("message", "success");
        returnObject.put("cart", cartRepository.findByPartyDetailsPartyId(cart.getPartyDetails().getPartyId()));
        return returnObject;
    }

//  Delete item from cart
    public HashMap<String, Object> deleteItem(Cart cart){
        returnObject = new HashMap<>();
//      Check if item is present in cart
        Cart found = cartRepository.findByPartyDetailsPartyIdAndItemPackingDetailsId(cart.getPartyDetails().getPartyId(), cart.getItemPackingDetails().getId());
        if (found!=null){ //Item preset in cart
//          Reduce quantity
            if (found.getQuantity() > cart.getQuantity()){
                found.setQuantity(found.getQuantity() - cart.getQuantity());
                cartRepository.save(found);
                returnObject.put("data", found);
            }
            else
//              Delete item from cart
                cartRepository.delete(cart);
            returnObject.put("message", "success");
        }
//      Item not present in cart
        else {
            returnObject.put("message", "failure");
        }
        return returnObject;
    }

//  Retrieve cart details
    public HashMap<String, Object> getCart(String username, String state){
        returnObject = new HashMap<>();
        List<Cart> cart = cartRepository.findByPartyDetailsPartyEmail(username);
        for (Cart item : cart){
            item.setPrice(stockService.getItemPrice(state, item.getId()));
        }
        returnObject.put("message", "success");
        returnObject.put("data", cart);
        return returnObject;
    }
}
