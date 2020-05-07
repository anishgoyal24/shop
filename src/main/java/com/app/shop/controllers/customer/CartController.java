package com.app.shop.controllers.customer;

import com.app.shop.entity.Cart;
import com.app.shop.services.customer.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

// Controller for functions related to user cart
@RestController
@RequestMapping(value = "/cart")
public class CartController {

    private CartService cartService;

    @Autowired
    public CartController(CartService cartService){
        this.cartService = cartService;
    }

//  Add item to a cart
    @PostMapping(value = "/add")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> addItem(@RequestBody Cart cart){
        return cartService.addItem(cart);
    }

//  Delete item from a cart
    @PostMapping(value = "/update")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> updateCart(@RequestBody Cart cart){
        return cartService.updateCart(cart);
    }

//  Get items in the cart
    @GetMapping(value = "/get")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> getCart(@RequestParam Integer id, @RequestParam String state){
        return cartService.getCart(id, state);
    }

//  Count
    @GetMapping(value = "/count")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> getCount(@RequestParam Integer partyId){
        return cartService.getCount(partyId);
    }
}
