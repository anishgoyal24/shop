package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "category_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    private int id;
    @Column(name = "categpry_name")
    private String category;
    @Column(name = "status", columnDefinition = "char default 'n'")
    private char status;
    @ManyToMany
    @JoinTable(name = "product_category_mapping", joinColumns = {@JoinColumn(name = "category_id")}, inverseJoinColumns = {@JoinColumn(name = "item_id")})
    private List<ItemDetails> itemDetails;
}
