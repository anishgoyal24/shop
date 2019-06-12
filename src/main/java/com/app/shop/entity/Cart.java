package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "party_id")
    private PartyDetails partyDetails;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ItemPackingDetails itemPackingDetails;
    private int quantity;
    private double price;

    public PartyDetails getPartyDetails() {
        return partyDetails;
    }

    public void setPartyDetails(PartyDetails partyDetails) {
        this.partyDetails = partyDetails;
    }

    public ItemPackingDetails getItemPackingDetails() {
        return itemPackingDetails;
    }

    public void setItemPackingDetails(ItemPackingDetails itemPackingDetails) {
        this.itemPackingDetails = itemPackingDetails;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
