package com.app.shop.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "item_packing_mapping")

public class ItemPacking {
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "item_id")
    private ItemDetails itemDetails;

    @ManyToOne
    @JoinColumn(name = "size", referencedColumnName = "size")
    private  PackingSizeDetails packingSizeDetails;

    @Embedded
    private ItemPackingStatus status;
    public ItemDetails getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(ItemDetails itemDetails) {
        this.itemDetails = itemDetails;
    }

    public PackingSizeDetails getPackingSizeDetails() {
        return packingSizeDetails;
    }

    public void setPackingSizeDetails(PackingSizeDetails packingSizeDetails) {
        this.packingSizeDetails = packingSizeDetails;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemPacking that = (ItemPacking) o;
        return id == that.id &&
                Objects.equals(itemDetails, that.itemDetails) &&
                Objects.equals(packingSizeDetails, that.packingSizeDetails) &&
                Objects.equals(status, that.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, itemDetails, packingSizeDetails, status);
    }
}
