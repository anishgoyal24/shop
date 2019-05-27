package com.app.shop.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public HashTable() {
    }
}
