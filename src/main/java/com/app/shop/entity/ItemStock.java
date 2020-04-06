package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "stock")
public class ItemStock {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ItemPackingDetails itemPackingDetails;
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "warehouse_id", referencedColumnName = "warehouse_id")
    private WarehouseDetails warehouseDetails;
    private int quantity;
    private double price;

}
