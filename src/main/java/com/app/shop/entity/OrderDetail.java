package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private long id;
    @OneToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private ItemPackingDetails itemDetails;
    private int quantity;
    @Column(name = "actual_cost")
    private double actualCost;
    @Column(name = "discounted_cost")
    private double discountedCost;

}
