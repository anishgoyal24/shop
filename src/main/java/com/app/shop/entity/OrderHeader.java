package com.app.shop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "order_header")
public class OrderHeader {

    @Id
    @Column(name = "order_id")
    private String orderId;
    @ManyToOne
    @JoinColumn(name = "party_id", nullable = false)
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private PartyDetails partyDetails;
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private WarehouseDetails warehouseDetails;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "order_date")
    private Date orderDate;
    @Temporal(TemporalType.DATE)
    @Column(name = "expected_delivery_date")
    private Date expectedDeliveryDate;
    @Column(name = "payment_mode")
    private String paymentMode;
    private String status;
    @Column(name = "closed_by")
    private String closedBy;
    @Column(name = "received_by")
    private String receivedBy;
    @Temporal(TemporalType.DATE)
    @Column(name = "delivery_date")
    private Date deliveryDate;
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private List<OrderDetail> orderDetails;
    @Column(name = "total_cost")
    private double totalCost;

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
