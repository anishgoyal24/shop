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
    @GeneratedValue(generator = "native", strategy = GenerationType.SEQUENCE)
    private int id;
    @Column(name = "username", unique = true)
    private String username;
    @Column(name = "primary_phone", unique = true)
    private String primaryPhone;
    @Column(length = 60)
    private String password;
    private int enabled;
    private String role;

    public UserDetails(String username, String password, int enabled, String role, String primaryPhone) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.role = role;
        this.primaryPhone = primaryPhone;
    }

    public UserDetails() {
    }
}
