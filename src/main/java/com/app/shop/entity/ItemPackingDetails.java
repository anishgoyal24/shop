package com.app.shop.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "packing_details")
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ItemPackingDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    private int size;
    private char status;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "item_id")
    private ItemDetails itemDetails;

    @Override
    public String toString() {
        return "ItemPackingDetails{" +
                "id=" + id +
                ", size=" + size +
                ", status=" + status +
                ", itemDetails=" + itemDetails +
                '}';
    }
}
