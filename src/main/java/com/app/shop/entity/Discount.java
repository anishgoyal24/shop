package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "discount")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private ItemPackingDetails itemPackingDetails;
    private float discount;
    private char status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ItemPackingDetails getItemPackingDetails() {
        return itemPackingDetails;
    }

    public void setItemPackingDetails(ItemPackingDetails itemPackingDetails) {
        this.itemPackingDetails = itemPackingDetails;
    }

    public float getDiscount() {
        return discount;
    }

    public void setDiscount(float discount) {
        this.discount = discount;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }
}
