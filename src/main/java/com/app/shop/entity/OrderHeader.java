package com.app.shop.entity;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "order_header")
public class OrderHeader {

    @EmbeddedId
    private OrderId orderId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "party_id", nullable = false)
    private PartyDetails partyDetails;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "warehouse_id", nullable = false)
    private WarehouseDetails warehouseDetails;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date")
    private Date orderDate;
    @Column(name = "expected_delivery_date")
    private Date expectedDeliveryDate;
    @Column(name = "payment_mode")
    private String paymentMode;
    private String status;
    @Column(name = "closed_by")
    private String closedBy;
    @Column(name = "received_by")
    private String receivedBy;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "delivery_date")
    private Date deliveryDate;

    public OrderId getOrderId() {
        return orderId;
    }

    public void setOrderId(OrderId orderId) {
        this.orderId = orderId;
    }

    public PartyDetails getPartyDetails() {
        return partyDetails;
    }

    public void setPartyDetails(PartyDetails partyDetails) {
        this.partyDetails = partyDetails;
    }

    public WarehouseDetails getWarehouseDetails() {
        return warehouseDetails;
    }

    public void setWarehouseDetails(WarehouseDetails warehouseDetails) {
        this.warehouseDetails = warehouseDetails;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Date getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(Date expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getClosedBy() {
        return closedBy;
    }

    public void setClosedBy(String closedBy) {
        this.closedBy = closedBy;
    }

    public String getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(String receivedBy) {
        this.receivedBy = receivedBy;
    }

    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
