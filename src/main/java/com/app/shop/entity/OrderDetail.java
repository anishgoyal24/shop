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
    private ItemPackingDetails itemDetails;
    private int quantity;
    @Column(name = "actual_cost")
    private double actualCost;
    @Column(name = "discounted_cost")
    private double discountedCost;


    public ItemPackingDetails getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(ItemPackingDetails itemDetails) {
        this.itemDetails = itemDetails;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getActualCost() {
        return actualCost;
    }

    public void setActualCost(double actualCost) {
        this.actualCost = actualCost;
    }

    public double getDiscountedCost() {
        return discountedCost;
    }

    public void setDiscountedCost(double discountedCost) {
        this.discountedCost = discountedCost;
    }
}
