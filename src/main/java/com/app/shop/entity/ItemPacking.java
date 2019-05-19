package com.app.shop.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "item_packing_mapping")
public class ItemPacking {

    @EmbeddedId
    private ItemPackingId id;

    @ManyToOne
    @MapsId("itemId")
    private ItemDetails itemDetails;

    @ManyToOne
    @MapsId("size")
    private  PackingSizeDetails packingSizeDetails;

    @Column(columnDefinition = "char default 'y'")
    private char status;

    public ItemPackingId getId() {
        return id;
    }

    public void setId(ItemPackingId id) {
        this.id = id;
    }

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

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemPacking that = (ItemPacking) o;
        return status == that.status &&
                Objects.equals(id, that.id) &&
                Objects.equals(itemDetails, that.itemDetails) &&
                Objects.equals(packingSizeDetails, that.packingSizeDetails);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, itemDetails, packingSizeDetails, status);
    }
}
