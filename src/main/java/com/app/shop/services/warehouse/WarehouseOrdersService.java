package com.app.shop.services.warehouse;


import com.app.shop.entity.OrderDetail;
import com.app.shop.entity.OrderHeader;
import com.app.shop.repository.warehouse.PincodeMappingRepository;
import com.app.shop.repository.warehouse.WarehouseOrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class WarehouseOrdersService {

    private WarehouseOrdersRepository warehouseOrdersRepository;
    private HashMap<String, Object> returnObject;
    private PincodeMappingRepository pincodeMappingRepository;

    @Autowired
    public WarehouseOrdersService(WarehouseOrdersRepository warehouseOrdersRepository, PincodeMappingRepository pincodeMappingRepository) {
        this.warehouseOrdersRepository = warehouseOrdersRepository;
        this.pincodeMappingRepository = pincodeMappingRepository;
    }

    public HashMap<String, Object> getOrderHeader(Integer warehouseId, int page){
        returnObject = new HashMap<>();
        List<OrderHeader> orderHeaders = warehouseOrdersRepository.findByWarehouseDetailsWarehouseIdOrderByOrderDateDesc(warehouseId, PageRequest.of(page, 10));
        returnObject.put("message", "success");
        returnObject.put("data", orderHeaders);
        return returnObject;
    }

    public HashMap<String, Object> getNextOrderHeader(Integer warehouseId, Date orderDate){
        returnObject = new HashMap<>();
        List<OrderHeader> orderHeaders = warehouseOrdersRepository.findNext10ByWarehouseDetails(warehouseId, orderDate, PageRequest.of(0, 10));
        returnObject.put("message", "success");
        returnObject.put("data", orderHeaders);
        return returnObject;
    }

    public HashMap<String, Object> getOrderDetails(String orderId){
        returnObject = new HashMap<>();
        OrderHeader orderHeader = warehouseOrdersRepository.findByOrderId(orderId);
        if (orderHeader!=null){
            returnObject.put("message", "success");
            List<OrderDetail> orderDetails = orderHeader.getOrderDetails();
            returnObject.put("message", "success");
            returnObject.put("order header", orderHeader);
            returnObject.put("order details", orderDetails);
            return returnObject;
        }
        returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> getOpenOrders(Integer warehouseId) {
        returnObject = new HashMap<>();
        List<String> pincodes = pincodeMappingRepository.findByWarehouseDetailsWarehouseId(warehouseId);
        List<OrderHeader> openOrders = warehouseOrdersRepository.findByPartyDetailsPincodeAndStatus(pincodes, "Waiting for Confirmation");
        returnObject.put("message", "success");
        returnObject.put("data", openOrders);
        return returnObject;
    }
}
