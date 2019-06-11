package com.app.shop.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "warehouse_mst")
public class WarehouseDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    @Column(name = "warehouse_id", nullable = false)
    private int warehouseId;
    private String password;
    @Column(name = "warehouse_name", nullable = false)
    private String warehouseName;
    @Column(name = "warehouse_email", unique = true, nullable = false)
    private String warehouseEmail;
    @Column(name = "person_of_contact", nullable = false)
    private String personOfContact;
    private String address;
    @Column(name = "primary_phone", nullable = false)
    private String primaryPhone;
    @Column(name = "secondary_phone")
    private String secondaryPhone;
    private String city;
    private String state;
    private String country;
    private String pincode;
    @Column(columnDefinition = "char default 'n'")
    private char status;
    private String type;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    private Date createDate;
    private String role;

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public String getPersonOfContact() {
        return personOfContact;
    }

    public void setPersonOfContact(String personOfContact) {
        this.personOfContact = personOfContact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPrimaryPhone() {
        return primaryPhone;
    }

    public void setPrimaryPhone(String primaryPhone) {
        this.primaryPhone = primaryPhone;
    }

    public String getSecondaryPhone() {
        return secondaryPhone;
    }

    public void setSecondaryPhone(String secondaryPhone) {
        this.secondaryPhone = secondaryPhone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getWarehouseEmail() {
        return warehouseEmail;
    }

    public void setWarehouseEmail(String warehouseEmail) {
        this.warehouseEmail = warehouseEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WarehouseDetails that = (WarehouseDetails) o;
        return warehouseId == that.warehouseId &&
                status == that.status &&
                Objects.equals(warehouseName, that.warehouseName) &&
                Objects.equals(warehouseEmail, that.warehouseEmail) &&
                Objects.equals(personOfContact, that.personOfContact) &&
                Objects.equals(address, that.address) &&
                Objects.equals(primaryPhone, that.primaryPhone) &&
                Objects.equals(secondaryPhone, that.secondaryPhone) &&
                Objects.equals(city, that.city) &&
                Objects.equals(state, that.state) &&
                Objects.equals(country, that.country) &&
                Objects.equals(pincode, that.pincode) &&
                Objects.equals(type, that.type) &&
                Objects.equals(createDate, that.createDate);
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(warehouseId, warehouseName, warehouseEmail, personOfContact, address, primaryPhone, secondaryPhone, city, state, country, pincode, status, type, createDate);
    }

    public void updateDetails(WarehouseDetails warehouseDetails) {
        this.warehouseName = warehouseDetails.getWarehouseName();
        this.warehouseEmail = warehouseDetails.getWarehouseEmail();
        this.personOfContact = warehouseDetails.getPersonOfContact();
        this.address = warehouseDetails.getAddress();
        this.primaryPhone = warehouseDetails.getPrimaryPhone();
        this.secondaryPhone = warehouseDetails.getSecondaryPhone();
        this.city = warehouseDetails.getCity();
        this.state = warehouseDetails.getState();
        this.country = warehouseDetails.getCountry();
        this.pincode = warehouseDetails.getPincode();
        this.type = warehouseDetails.getType();
    }

    public WarehouseDetails() {
    }
}
