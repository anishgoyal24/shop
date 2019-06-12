package com.app.shop.controllers.customer;

import com.app.shop.entity.Cart;
import com.app.shop.services.customer.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping(value = "/add")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> addItem(@RequestBody Cart cart){
        return cartService.addItem(cart);
    }

    @PostMapping(value = "/delete")
    @PreAuthorize("hasAnyAuthority('ROLE_party')")
    public HashMap<String, Object> deleteItem(@RequestBody Cart cart){
        return cartService.deleteItem(cart);
    }
}
