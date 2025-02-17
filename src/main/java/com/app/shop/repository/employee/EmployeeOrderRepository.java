package com.app.shop.repository.employee;

import com.app.shop.entity.OrderHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeOrderRepository extends JpaRepository<OrderHeader, Integer> {

    @Query("select orderHeader from OrderHeader orderHeader where FUNCTION('MONTH', orderHeader.orderDate) = :month and FUNCTION('YEAR', orderHeader.orderDate) = :year")
    List<OrderHeader> findAllByOrderDate_MonthAndOrderDate_Year(int month, int year);

    @Query("select count(orderHeader.orderId) from OrderHeader orderHeader, OrderDetail orderDetail where FUNCTION('MONTH', orderHeader.orderDate) = :month and FUNCTION('YEAR', orderHeader.orderDate) = :year group by orderDetail.itemDetails.itemDetails")
    Object[] findProductOverview(@Param("month") int month, @Param("year") int year);

    @Query("select count(orderHeader.orderId) from OrderHeader orderHeader, OrderDetail orderDetail where FUNCTION('MONTH', orderHeader.orderDate) = :month and FUNCTION('YEAR', orderHeader.orderDate) = :year group by orderHeader.warehouseDetails.state")
    Object[] stateOverview(@Param("month")int month, @Param("year") int year);
}
