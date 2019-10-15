package com.app.shop.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(name = "party_mst")
public class PartyDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
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
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String state;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String pincode;
    private char status;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "party_type", referencedColumnName = "id")
    private PartyType partyType;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date", updatable = false)
    private Date createDate;
    private float discount;

    public void updateDetails(PartyDetails newPartyDetails){
        this.partyName = newPartyDetails.getPartyName();
        this.contactPerson = newPartyDetails.getContactPerson();
        this.address = newPartyDetails.getAddress();
        this.primaryPhone = newPartyDetails.getPrimaryPhone();
        this.secondaryPhone = newPartyDetails.getSecondaryPhone();
        this.city = newPartyDetails.getCity();
        this.state = newPartyDetails.getState();
        this.country = newPartyDetails.getCountry();
        this.pincode = newPartyDetails.getPincode();
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PartyDetails that = (PartyDetails) o;
        return partyId == that.partyId &&
                status == that.status &&
                Float.compare(that.discount, discount) == 0 &&
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
                Objects.equals(partyType, that.partyType) &&
                Objects.equals(createDate, that.createDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(partyId, password, partyName, partyEmail, contactPerson, address, primaryPhone, secondaryPhone, city, state, country, pincode, status, partyType, createDate, discount);
    }

    @Override
    public String toString() {
        return "PartyDetails{" +
                "partyId=" + partyId +
                ", password='" + password + '\'' +
                ", partyName='" + partyName + '\'' +
                ", partyEmail='" + partyEmail + '\'' +
                ", contactPerson='" + contactPerson + '\'' +
                ", address='" + address + '\'' +
                ", primaryPhone='" + primaryPhone + '\'' +
                ", secondaryPhone='" + secondaryPhone + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", pincode='" + pincode + '\'' +
                ", status=" + status +
                ", partyType=" + partyType +
                ", createDate=" + createDate +
                ", discount=" + discount +
                '}';
    }
}
