package com.app.shop.services.customer;

import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.customer.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> placeOrder(OrderHeader orderHeader){
        returnObject = new HashMap<>();

        return returnObject;
    }
}
