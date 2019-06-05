package com.app.shop.utils;

import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.customer.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderBookingThread implements Runnable {

    @Autowired
    private OrderRepository orderRepository;
    private OrderHeader orderHeader;

    @Override
    public void run() {
        bookOrder();
    }

    private void bookOrder(){

    }

    public OrderHeader getOrderHeader() {
        return orderHeader;
    }

    public void setOrderHeader(OrderHeader orderHeader) {
        this.orderHeader = orderHeader;
    }
}
