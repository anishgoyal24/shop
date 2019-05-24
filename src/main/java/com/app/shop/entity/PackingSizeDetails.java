package com.app.shop.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "item_packing_details")
public class PackingSizeDetails {
    @Id
    @Column(name = "packing_id", nullable = false)
    private int packingId;
    private int size;
    @Column(columnDefinition = "char default 'n'")
    private char status;

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

    public int getPackingId() {
        return packingId;
    }

    public void setPackingId(int packingId) {
        this.packingId = packingId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PackingSizeDetails that = (PackingSizeDetails) o;
        return packingId == that.packingId &&
                size == that.size &&
                status == that.status;
    }

    @Override
    public int hashCode() {
        return Objects.hash(packingId, size, status);
    }
}

