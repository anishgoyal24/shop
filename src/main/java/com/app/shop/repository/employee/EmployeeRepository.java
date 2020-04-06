package com.app.shop.repository.employee;

import com.app.shop.entity.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeDetails, Integer> {
    public EmployeeDetails findByEmpEmail(String email);
    public EmployeeDetails findByPrimaryPhone(String phone);
}
