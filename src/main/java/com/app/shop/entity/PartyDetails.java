package com.app.shop.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "party_mst")
public class PartyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "party_id")
    private int partyId;
    private String password;
    @Column(name = "party_name", nullable = false)
    private String partyName;
    @Column(name = "party_email", unique = true, nullable = false)
    private String partyEmail;
    @Column(name = "contact_person", nullable = false)
    private String contactPerson;
    @Column(length = 400, nullable = false)
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

    public int getPartyId() {
        return partyId;
    }

    public void setPartyId(int partyId) {
        this.partyId = partyId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }

    public String getPartyEmail() {
        return partyEmail;
    }

    public void setPartyEmail(String partyEmail) {
        this.partyEmail = partyEmail;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyDetails that = (PartyDetails) o;
        return partyId == that.partyId &&
                status == that.status &&
                Objects.equals(password, that.password) &&
                Objects.equals(partyName, that.partyName) &&
                Objects.equals(partyEmail, that.partyEmail) &&
                Objects.equals(contactPerson, that.contactPerson) &&
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

    @Override
    public int hashCode() {
        return Objects.hash(partyId, password, partyName, partyEmail, contactPerson, address, primaryPhone, secondaryPhone, city, state, country, pincode, status, type, createDate);
    }
}
