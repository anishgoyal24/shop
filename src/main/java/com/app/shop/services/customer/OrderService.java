package com.app.shop.services.customer;

import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.customer.DetailsRepository;
import com.app.shop.repository.customer.OrderRepository;
import com.app.shop.utils.OrderBookingThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private DetailsRepository detailsRepository;
    private HashMap<String, Object> returnObject;

    public HashMap<String, Object> placeOrder(OrderHeader orderHeader){
        returnObject = new HashMap<>();
        if (detailsRepository.findByPartyId(orderHeader.getPartyDetails().getPartyId())!=null) {
            orderHeader.setOrderId(createOrderId(orderHeader.getPartyDetails().getPartyId()));
            OrderBookingThread orderBookingThread = new OrderBookingThread();
            orderBookingThread.setOrderHeader(orderHeader);
            Thread thread = new Thread(orderBookingThread);
            thread.run();
            returnObject.put("message", "waiting for confimation");
            returnObject.put("data", orderHeader);
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    private String createOrderId(int partyId){
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("ddssMMmmyyyyHH");
        Date date = new Date();
        String orderId = simpleDateFormat.format(date) + partyId;
        return orderId;
    }

}
