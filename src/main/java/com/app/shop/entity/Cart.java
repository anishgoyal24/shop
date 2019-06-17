package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
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
}
