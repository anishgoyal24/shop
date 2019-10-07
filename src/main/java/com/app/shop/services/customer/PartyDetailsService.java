package com.app.shop.services.customer;

import com.app.shop.entity.PartyDetails;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.customer.DetailsRepository;
import com.app.shop.utils.ChangePasswordClass;
import com.app.shop.utils.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;

@Service
public class PartyDetailsService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private DetailsRepository detailsRepository;
    private HashMap<String, Object> returnObject;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private EmailServiceImpl emailService;
    @Autowired
    private UserAuthRepository userAuthRepository;

    private void detachParty(PartyDetails partyDetails){
        entityManager.detach(partyDetails);
    }
    public HashMap<String, Object> addNewUser(PartyDetails partyDetails){
        returnObject = new HashMap<>();
        partyDetails.setPartyEmail(partyDetails.getPartyEmail().toLowerCase());
        PartyDetails oldPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
        if (oldPartyDetails==null){
            partyDetails.setStatus('y');
            String encodedPassword = bCryptPasswordEncoder.encode(partyDetails.getPassword());
            partyDetails.setPassword(encodedPassword);
            detailsRepository.save(partyDetails);
            detachParty(partyDetails);
            userAuthRepository.save(new UserDetails(partyDetails.getPartyEmail(), encodedPassword, 1, "party"));
            partyDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", partyDetails);
        }
        else {
            returnObject.put("message", "user already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> updateUserDetails(PartyDetails partyDetails) {
        returnObject = new HashMap<>();
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
        if (foundPartyDetails!=null){
            foundPartyDetails.updateDetails(partyDetails);
            detailsRepository.save(foundPartyDetails);
            detachParty(foundPartyDetails);
            foundPartyDetails.setPassword(null);
            returnObject.put("message", "success");
            returnObject.put("data", foundPartyDetails);
        }
        else {
            returnObject.put("message", "failure");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    public HashMap<String, Object> deleteUser(String email) {
        returnObject = new HashMap<>();
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(email);
        if (foundPartyDetails!=null){
            foundPartyDetails.setStatus('n');
            detailsRepository.save(foundPartyDetails);
            UserDetails userDetails = userAuthRepository.findByUsername(email);
            userDetails.setEnabled(0);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "deleted successfully");
            returnObject.put("email", email);
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> changePassword(ChangePasswordClass object){
        returnObject = new HashMap<>();
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(object.getEmail());
        if (foundPartyDetails!=null && bCryptPasswordEncoder.matches(object.getOldPassword(), foundPartyDetails.getPassword())){
            String encodedPassword = bCryptPasswordEncoder.encode(object.getNewPassword());
            foundPartyDetails.setPassword(encodedPassword);
            detailsRepository.save(foundPartyDetails);
            UserDetails userDetails = userAuthRepository.findByUsername(object.getEmail());
            userDetails.setPassword(encodedPassword);
            userAuthRepository.save(userDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> getDiscount(int partyId){
        returnObject = new HashMap<>();
        if (detailsRepository.findById(partyId).isPresent()){
            PartyDetails foundPartyDetails = detailsRepository.findById(partyId).get();
            returnObject.put("message", "success");
            returnObject.put("data", foundPartyDetails.getDiscount());
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> addDiscount(int partyId, float discount){
        returnObject = new HashMap<>();
        if (detailsRepository.findById(partyId).isPresent()){
            PartyDetails foundPartyDetails = detailsRepository.findById(partyId).get();
            foundPartyDetails.setDiscount(discount);
            detailsRepository.save(foundPartyDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> getDetails(String username){
        returnObject = new HashMap<>();
        PartyDetails partyDetails = detailsRepository.findByPartyEmail(username);
        detachParty(partyDetails);
        partyDetails.setPassword("");
        returnObject.put("message", "success");
        returnObject.put("data", partyDetails);
        return returnObject;
    }

    public HashMap<String, Object> sendOTP(Map<String, Object> body){
        returnObject = new HashMap<>();
        try {
            emailService.sendMail(body.get("email").toString(), "Your OTP for account verification is " + body.get("OTP"), "Please verigy your account");
            returnObject.put("message", "success");
        }
        catch (Exception e){
            returnObject.put("message", "some exception occured");
        }
        finally {
            return returnObject;
        }
    }
}
