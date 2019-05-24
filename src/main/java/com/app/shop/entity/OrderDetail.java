package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "order_id")
    private OrderHeader orderHeader;
    @OneToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private ItemPacking itemPacking;
    private int quantity;
    private double cost;

    public OrderHeader getOrderHeader() {
        return orderHeader;
    }

    public void setOrderHeader(OrderHeader orderHeader) {
        this.orderHeader = orderHeader;
    }

    public ItemPacking getItemPacking() {
        return itemPacking;
    }

    public void setItemPacking(ItemPacking itemPacking) {
        this.itemPacking = itemPacking;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
