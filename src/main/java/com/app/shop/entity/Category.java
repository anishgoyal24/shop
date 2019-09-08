package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ItemDetails itemDetails;
}
