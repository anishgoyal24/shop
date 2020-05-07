package com.app.shop.repository.customer;

import com.app.shop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

    public List<Cart> findByPartyDetailsPartyId(Integer partyId);

    public Cart findByPartyDetailsPartyIdAndItemPackingDetailsId(Integer partyId, Integer id);

    public List<Cart> findByPartyDetailsPartyEmail(String partyEmail);

    @Query("select count(cart) from Cart cart where cart.partyDetails.partyId=:partyId")
    public Integer findCount(@Param("partyId") Integer partyId);

}
