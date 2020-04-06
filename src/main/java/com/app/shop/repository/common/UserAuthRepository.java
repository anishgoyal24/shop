package com.app.shop.repository.common;

import com.app.shop.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAuthRepository extends JpaRepository<UserDetails, String>{

    public UserDetails findByUsername(String username);

    public UserDetails findByPrimaryPhone(String primaryPhone);
}
