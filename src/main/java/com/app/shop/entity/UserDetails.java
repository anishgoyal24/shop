package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "user_details")
public class UserDetails {

    @Id
    private String username;
    @Column(length = 60)
    private String password;
    private int enabled;
    private String role;

    public UserDetails(String username, String password, int enabled, String role) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.role = role;
    }

    public UserDetails() {
    }
}
