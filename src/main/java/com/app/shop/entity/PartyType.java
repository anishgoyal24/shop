package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "party_types")
public class PartyType {
    @Id
    private int id;
    private String type;
    char status;

}
