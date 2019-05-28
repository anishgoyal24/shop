package com.app.shop.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "order_header")
public class OrderHeader {

    @Id
    @Column(name = "order_id")
    private String orderId;
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
    @OneToMany
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private List<OrderDetail> orderDetails;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
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

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(ArrayList<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderHeader that = (OrderHeader) o;
        return Objects.equals(orderId, that.orderId) &&
                Objects.equals(partyDetails, that.partyDetails) &&
                Objects.equals(warehouseDetails, that.warehouseDetails) &&
                Objects.equals(orderDate, that.orderDate) &&
                Objects.equals(expectedDeliveryDate, that.expectedDeliveryDate) &&
                Objects.equals(paymentMode, that.paymentMode) &&
                Objects.equals(status, that.status) &&
                Objects.equals(closedBy, that.closedBy) &&
                Objects.equals(receivedBy, that.receivedBy) &&
                Objects.equals(deliveryDate, that.deliveryDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, partyDetails, warehouseDetails, orderDate, expectedDeliveryDate, paymentMode, status, closedBy, receivedBy, deliveryDate);
    }
}
