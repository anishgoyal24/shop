package com.app.shop.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "emp_mst")
public class EmployeeDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "native")
    @Column(name = "emp_id")
    private int empId;
    private String password;
    @Column(name = "emp_name", nullable = false)
    private String empName;
    @Column(name = "emp_email", unique = true, nullable = false)
    private String empEmail;
    private String address;
    @Column(name = "primary_phone", nullable = false)
    private String primaryPhone;
    private String city;
    private String state;
    private String country;
    private String pincode;
    @Column(columnDefinition = "char default 'n'")
    private char status;
    private String role;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_date")
    private Date createDate;

    public int getEmpId() {
        return empId;
    }

    public void setEmpId(int empId) {
        this.empId = empId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
        EmployeeDetails that = (EmployeeDetails) o;
        return empId == that.empId &&
                status == that.status &&
                Objects.equals(password, that.password) &&
                Objects.equals(empName, that.empName) &&
                Objects.equals(empEmail, that.empEmail) &&
                Objects.equals(address, that.address) &&
                Objects.equals(primaryPhone, that.primaryPhone) &&
                Objects.equals(city, that.city) &&
                Objects.equals(state, that.state) &&
                Objects.equals(country, that.country) &&
                Objects.equals(pincode, that.pincode) &&
                Objects.equals(role, that.role) &&
                Objects.equals(createDate, that.createDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(empId, password, empName, empEmail, address, primaryPhone, city, state, country, pincode, status, role, createDate);
    }

    public void updateDetails(EmployeeDetails employeeDetails) {
        this.address = employeeDetails.getAddress();
        this.primaryPhone = employeeDetails.getPrimaryPhone();
        this.city = employeeDetails.getCity();
        this.state = employeeDetails.getState();
        this.country = employeeDetails.getCountry();
        this.pincode = employeeDetails.getPincode();
    }
}
