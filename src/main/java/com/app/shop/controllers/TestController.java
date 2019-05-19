package com.app.shop.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @RequestMapping(path = "/rest/hello", method = RequestMethod.GET)
    public String hello(){
        return "Hello";
    }

}
