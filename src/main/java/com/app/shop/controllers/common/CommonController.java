package com.app.shop.controllers.common;

import com.app.shop.utils.AccountVerificationService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommonController {

    @PostMapping(value = "/verify/{hash}/{type}")
    public String verifyAccount(@PathVariable String hash, @PathVariable String type){
        return new AccountVerificationService().verifyAccount(hash, type);
    }
}
