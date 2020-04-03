package com.app.shop.services.customer;

import com.app.shop.entity.OTP;
import com.app.shop.repository.customer.OtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    private OtpRepository otpRepository;

    @Autowired
    public OtpService(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

//  Get already generated otp
    public OTP getOtp(String email){
        return otpRepository.findByEmail(email);
    }

//  Generate and new OTP
    public String saveOtp(OTP otp){
       OTP found = otpRepository.findByEmail(otp.getEmail());
       if (found!=null)otpRepository.delete(found);
       otpRepository.save(otp);
       return "success";
    }

//  Delete otp
    public String deleteOtp(String email){
        OTP found = otpRepository.findByEmail(email);
        if (found!=null){
            otpRepository.delete(found);
            return "success";
        }
        return "no such otp";
    }
}
