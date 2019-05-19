package com.app.shop.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "item_packing_details")
public class PackingSizeDetails {
    private int size;
    @Column(columnDefinition = "char default 'n'")
    private char status;
    @OneToMany(mappedBy = "item_packing_details", cascade = CascadeType.ALL)
    private List<ItemDetails> itemDetails = new ArrayList<>();

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

    public List<ItemDetails> getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(List<ItemDetails> itemDetails) {
        this.itemDetails = itemDetails;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PackingSizeDetails that = (PackingSizeDetails) o;
        return size == that.size &&
                status == that.status &&
                Objects.equals(itemDetails, that.itemDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(size, status, itemDetails);
    }
}
