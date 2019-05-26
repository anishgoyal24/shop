package com.app.shop.entity;


import javax.persistence.*;

@Entity
@Table(name = "packing_details")
public class ItemPackingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    private Integer size;
    private char status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }
}
