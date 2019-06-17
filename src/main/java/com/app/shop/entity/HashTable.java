package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "hash_table")
public class HashTable {

    @Id
    private String email;
    private String hash;

    public HashTable(String email, String encodedEmail) {
        this.email = email;
        this.hash = encodedEmail;
    }

    public HashTable() {
    }
}
