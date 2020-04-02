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
    @PostMapping(value = "/delete")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> deleteItem(@RequestBody Cart cart){
        return cartService.deleteItem(cart);
    }

//  Get items in the cart
    @GetMapping(value = "/get")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> getCart(@RequestParam String username, @RequestParam String state){
        return cartService.getCart(username, state);
    }
}
