package com.app.shop.services.customer;

import com.app.shop.entity.HashTable;
import com.app.shop.entity.PartyDetails;
import com.app.shop.repository.common.HashRepository;
import com.app.shop.repository.customer.DetailsRepository;
import com.app.shop.utils.ChangePasswordClass;
import com.app.shop.utils.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;

@Service
public class CustomerDetailsService {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private HashRepository hashRepository;
    @Autowired
    private DetailsRepository detailsRepository;
    private HashMap<String, Object> returnObject;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    @Autowired
    private EmailServiceImpl emailService;

    private void detachParty(PartyDetails partyDetails){
        entityManager.detach(partyDetails);
    }
    public HashMap<String, Object> addNewUser(PartyDetails partyDetails){
        returnObject = new HashMap<>();
        PartyDetails oldPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
        if (oldPartyDetails==null){
            partyDetails.setStatus('n');
            partyDetails.setPassword(bCryptPasswordEncoder.encode(partyDetails.getPassword()));
            detailsRepository.save(partyDetails);
            detachParty(partyDetails);
            partyDetails.setPassword(null);
            String encodedEmail = bCryptPasswordEncoder.encode(partyDetails.getPartyEmail());
            String verificationAddress = "/" + encodedEmail;
            hashRepository.save(new HashTable(partyDetails.getPartyEmail(),encodedEmail));
            try {
                emailService.sendMail(partyDetails.getPartyEmail(), verificationAddress, "Please verify you account");
            } catch (Exception e) {
                e.printStackTrace();
            }
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
            returnObject.put("message", "deleted successfully");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> changePassword(ChangePasswordClass object){
        returnObject = new HashMap<>();
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(object.getEmail());
        if (foundPartyDetails!=null && bCryptPasswordEncoder.matches(object.getOldPassword(), foundPartyDetails.getPassword())){
            foundPartyDetails.setPassword(bCryptPasswordEncoder.encode(object.getNewPassword()));
            detailsRepository.save(foundPartyDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public String verify(String email) {
        PartyDetails foundPartyDetails = detailsRepository.findByPartyEmail(email);
        if (foundPartyDetails!=null){
            foundPartyDetails.setStatus('y');
            detailsRepository.save(foundPartyDetails);
            return "Successfully Verified";
        }
        return "Invalid Request";
    }
}
