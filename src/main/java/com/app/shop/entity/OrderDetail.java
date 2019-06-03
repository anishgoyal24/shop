package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private double id;
    @OneToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private ItemDetails itemDetails;
    private int quantity;
    private double cost;


    public ItemDetails getItemPacking() {
        return itemDetails;
    }

    public void setItemPacking(ItemDetails itemPacking) {
        this.itemDetails = itemPacking;
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
