package com.app.shop.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ItemPackingId implements Serializable {

    @Column(name = "item_id")
    private int itemId;
    @Column(name = "packing_size")
    private int packingSize;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ItemPackingId that = (ItemPackingId) o;
        return itemId == that.itemId &&
                packingSize == that.packingSize;
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, packingSize);
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getPackingSize() {
        return packingSize;
    }

    public void setPackingSize(int packingSize) {
        this.packingSize = packingSize;
    }
}
