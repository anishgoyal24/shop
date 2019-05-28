package com.app.shop.repository.customer;

import com.app.shop.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Integer> {

    @Query("select d.discount from Discount d where d.partyType.type=:type and d.itemPackingDetails.itemDetails.id=:itemId")
    public float findDiscount(@Param("type") String type, @Param("itemId") Integer itemId);
}
