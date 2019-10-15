package com.app.shop.repository.customer;

import com.app.shop.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OtpRepository extends JpaRepository<OTP, Integer> {

    public OTP findByEmail(String email);

    public OTP findByOtp(Integer otp);
}
