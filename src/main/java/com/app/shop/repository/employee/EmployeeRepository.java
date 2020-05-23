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

    @Query("select emp.empName, emp.empEmail, emp.empId, emp.status from EmployeeDetails emp where lower(emp.empName) like %:query% or lower(emp.empEmail) like %:query% or emp.primaryPhone like %:query%")
    List<Object[]> search(@Param("query") String query);
}
