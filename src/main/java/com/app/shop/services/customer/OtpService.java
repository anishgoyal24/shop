package com.app.shop.services.customer;

import com.app.shop.entity.OTP;
import com.app.shop.repository.customer.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    @Autowired
    private OtpRepository otpRepository;

    public OTP getOtp(String email){
        return otpRepository.findByEmail(email);
    }

    public String saveOtp(OTP otp){
       OTP found = otpRepository.findByEmail(otp.getEmail());
       if (found!=null)otpRepository.delete(found);
       otpRepository.save(otp);
       return "success";
    }

    public String deleteOtp(String email){
        OTP found = otpRepository.findByEmail(email);
        if (found!=null){
            otpRepository.delete(found);
            return "success";
        }
        return "no such otp";
    }
}
