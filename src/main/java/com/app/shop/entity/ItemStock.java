package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "stock")
public class ItemStock {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private ItemPacking itemPacking;
    @ManyToOne
    @JoinColumn(name = "warehouse_id", referencedColumnName = "warehouse_id")
    private WarehouseDetails warehouseDetails;
    private int quantity;
    private double price;
}
