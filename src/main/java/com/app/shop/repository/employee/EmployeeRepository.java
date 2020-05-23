package com.app.shop.repository.employee;

import com.app.shop.entity.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeDetails, Integer> {
    public EmployeeDetails findByEmpEmail(String email);
    public EmployeeDetails findByPrimaryPhone(String phone);

    @Query("select emp.empName, emp.empEmail from EmployeeDetails emp where emp.empName like %:queyr% or emp.empEmail like %:query% or emp.primaryPhone like %:query%")
    List<Object[]> search(@Param("query") String query);
}
