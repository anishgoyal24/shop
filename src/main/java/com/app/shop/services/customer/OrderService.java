package com.app.shop.services.customer;

import com.app.shop.entity.OrderDetail;
import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.customer.DetailsRepository;
import com.app.shop.repository.customer.OrderRepository;
import com.app.shop.repository.customer.PartyStockRepository;
import com.app.shop.utils.OrderBookingThread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private DetailsRepository detailsRepository;
    @Autowired
    private PartyStockRepository partyStockRepository;
    @Autowired
    private ProductService productService;
    private HashMap<String, Object> returnObject;
    @Autowired
    private OrderRepository orderRepository;

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

    public HashMap<String, Object> checkStock(OrderHeader orderHeader){
        returnObject = new HashMap<>();
        HashMap<Integer, Integer> outOfStock = new HashMap<>();
        ArrayList<Float> discount = new ArrayList<>();
        for (OrderDetail orderDetails: orderHeader.getOrderDetails()){
            Object[][] objects = partyStockRepository.findStockAndPrice(orderHeader.getPartyDetails().getState(), orderDetails.getItemDetails().getId());
            if ((int)objects[0][0] < orderDetails.getQuantity()){
                outOfStock.put(orderDetails.getItemDetails().getId(), (int)objects[0][0]);
            }
            discount.add((float)productService.getDiscount(orderDetails.getItemDetails().getId()).get("discount"));
            orderDetails.setActualCost((int)objects[0][1]);
        }
        if (outOfStock.size()>0){
            returnObject.put("message", "some items out of stock");
            returnObject.put("out of stock items", outOfStock);
        }
        returnObject.put("discounts", discount);
        returnObject.put("updated price", orderHeader);
        return returnObject;
    }

    public HashMap<String, Object> getOrders(String email) {
        returnObject = new HashMap<>();
        List<OrderHeader> orders = orderRepository.findByPartyDetailsPartyEmail(email, PageRequest.of(0,10));
        returnObject.put("message", "success");
        returnObject.put("data", orders);
        return returnObject;
    }
}
