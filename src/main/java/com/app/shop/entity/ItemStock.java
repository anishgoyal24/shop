package com.app.shop.entity;

import javax.persistence.*;

@Entity
@Table(name = "stock")
public class ItemStock {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ItemPackingDetails itemPackingDetails;
    @ManyToOne
    @JoinColumn(name = "warehouse_id", referencedColumnName = "warehouse_id")
    private WarehouseDetails warehouseDetails;
    private int quantity;
    private double price;

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

    public WarehouseDetails getWarehouseDetails() {
        return warehouseDetails;
    }

    public void setWarehouseDetails(WarehouseDetails warehouseDetails) {
        this.warehouseDetails = warehouseDetails;
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
