package com.app.shop.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "item_mst")
public class ItemDetails {

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int itemId;
    @Column(name = "item_name", nullable = false)
    private String itemName;
    @Column(columnDefinition = "char default 'n'")
    private char status;
    @OneToMany(mappedBy = "itemDetails", cascade = CascadeType.ALL)
    private List<ItemPacking> itemPackings = new ArrayList<>();

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

    public List<ItemPacking> getItemPackings() {
        return itemPackings;
    }

    public void setItemPackings(List<ItemPacking> itemPackings) {
        this.itemPackings = itemPackings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemDetails that = (ItemDetails) o;
        return itemId == that.itemId &&
                status == that.status &&
                Objects.equals(itemName, that.itemName) &&
                Objects.equals(itemPackings, that.itemPackings);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, itemName, status, itemPackings);
    }
}
