package com.app.shop.services.customer;

import com.app.shop.entity.Cart;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.entity.PartyDetails;
import com.app.shop.repository.customer.CartRepository;
import com.app.shop.services.warehouse.StockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private CartRepository cartRepository;
    private HashMap<String, Object> returnObject;
    private StockService stockService;
    private PartyDetailsService partyDetailsService;
    private ItemPackingDetailsService itemPackingDetailsService;

    Logger logger = LoggerFactory.getLogger(CartService.class);

    @Autowired
    public CartService(CartRepository cartRepository, StockService stockService, PartyDetailsService partyDetailsService, ItemPackingDetailsService itemPackingDetailsService) {
        this.cartRepository = cartRepository;
        this.stockService = stockService;
        this.partyDetailsService = partyDetailsService;
        this.itemPackingDetailsService = itemPackingDetailsService;
    }

//  Add item to a cart
    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addItem(Cart cart){
        returnObject = new HashMap<>();
//      Check if item is already present in cart
         Cart foundItem = cartRepository.findByPartyDetailsPartyIdAndItemPackingDetailsId(cart.getPartyDetails().getPartyId(), cart.getItemPackingDetails().getId());
        if (foundItem==null){
//          Not present then add
            cart.setPartyDetails(partyDetailsService.findById(cart.getPartyDetails().getPartyId()));
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
    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> updateCart(Cart cart){
        returnObject = new HashMap<>();
//      Check if item is present in cart
        Optional<Cart> optionalCart = cartRepository.findById(cart.getId());
        if (optionalCart.isPresent()){ //Item preset in cart
            Cart found = optionalCart.get();
//          Change quantity
            if (found.getQuantity() != cart.getQuantity()){
                found.setQuantity(cart.getQuantity());
                cartRepository.save(found);
                returnObject.put("message", "success");
                returnObject.put("data", found);
            }
            else
//              Delete item from cart
                cartRepository.delete(found);
            returnObject.put("message", "success");
        }
//      Item not present in cart
        else {
            returnObject.put("message", "failure");
        }
        return returnObject;
    }

//  Retrieve cart details
    @Transactional(rollbackFor = Exception.class)
    public HashMap<String, Object> getCart(Integer partyId, String state){
        returnObject = new HashMap<>();
        List<Cart> cart = cartRepository.findByPartyDetailsPartyId(partyId);
        List<Object> carts = new ArrayList<>();
        for (Cart item : cart){
            HashMap<String, Object> cartItem = new HashMap<>();
            item.setPrice(stockService.getItemPrice(state, item.getItemPackingDetails().getId()));
            cartItem.put("item", item);
            cartItem.put("product", item.getItemPackingDetails().getItemDetails().getItemName());
            cartItem.put("image", item.getItemPackingDetails().getItemDetails().getImage());
            carts.add(cartItem);
        }
        cartRepository.saveAll(cart);
        returnObject.put("message", "success");
        returnObject.put("data", carts);
        return returnObject;
    }
}
