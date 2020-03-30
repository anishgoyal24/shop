package com.app.shop.services.employee;

import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.employee.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class OverviewService {

    private OrderRepository  orderRepository;
    private HashMap<String, Object> returnObject;

    @Autowired
    public OverviewService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }


    public HashMap<String, Object> getOrdersOverview(int month, int year) {
        returnObject = new HashMap<>();
        List<OrderHeader> orders = orderRepository.findOrderHeadersByOrderDate_MonthAndOrderDate_Year(month, year);
        returnObject.put("data", orders);
        return returnObject;
    }

    public HashMap<String, Object> getOrdersCount(int month, int year) {
        returnObject = new HashMap<>();
        int count = orderRepository.findOrderHeadersByOrderDate_MonthAndOrderDate_Year(month, year).size();
        returnObject.put("count", count);
        return returnObject;
    }

    public HashMap<String, Object> getProductsOverview(int month, int year) {
        returnObject = new HashMap<>();
        returnObject.put("data", orderRepository.findProductOverview(month, year));
        return returnObject;
    }

    public HashMap<String, Object> getStateOverview(int month, int year) {
        returnObject = new HashMap<>();
        returnObject.put("data", orderRepository.stateOverview(month, year));
        return returnObject;
    }
}
