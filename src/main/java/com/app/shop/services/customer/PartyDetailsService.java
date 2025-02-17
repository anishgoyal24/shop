package com.app.shop.services.customer;

import com.app.shop.entity.OTP;
import com.app.shop.entity.PartyDetails;
import com.app.shop.entity.PartyType;
import com.app.shop.entity.UserDetails;
import com.app.shop.repository.common.CountryRepository;
import com.app.shop.repository.common.StateRepository;
import com.app.shop.repository.common.UserAuthRepository;
import com.app.shop.repository.customer.DetailsRepository;
import com.app.shop.services.employee.PartyTypeService;
import com.app.shop.utils.ChangePasswordClass;
import com.app.shop.utils.EmailServiceImpl;
import com.app.shop.utils.GeneratePassword;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PartyDetailsService {

    Logger logger = LoggerFactory.getLogger(PartyDetailsService.class);
    @PersistenceContext
    private EntityManager entityManager;

    private DetailsRepository detailsRepository;
    private HashMap<String, Object> returnObject;
    private EmailServiceImpl emailService;
    private UserAuthRepository userAuthRepository;
    private PartyTypeService partyTypeService;
    private PasswordEncoder bCryptPasswordEncoder;
    private StateRepository stateRepository;
    private CountryRepository countryRepository;
    private RestTemplate restTemplate;

    @Value("${server-url}")
    private String serverURL;

    @Autowired
    public PartyDetailsService(DetailsRepository detailsRepository, EmailServiceImpl emailService, UserAuthRepository userAuthRepository, PartyTypeService partyTypeService, PasswordEncoder passwordEncoder, StateRepository stateRepository, CountryRepository countryRepository, RestTemplate restTemplate) {
        this.detailsRepository = detailsRepository;
        this.emailService = emailService;
        this.userAuthRepository = userAuthRepository;
        this.partyTypeService = partyTypeService;
        this.bCryptPasswordEncoder = passwordEncoder;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
        this.restTemplate = restTemplate;
    }

//  Detach persisted object
    private void detachParty(PartyDetails partyDetails){
        entityManager.detach(partyDetails);
    }


//  Add a new party
    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addNewUser(PartyDetails partyDetails){
        returnObject = new HashMap<>();
        partyDetails.setPartyEmail(partyDetails.getPartyEmail().toLowerCase());
        PartyDetails oldPartyDetails = detailsRepository.findByPartyEmail(partyDetails.getPartyEmail());
//      Check if party already exists
        if (oldPartyDetails==null) {
            partyDetails.setPartyType(partyTypeService.getType(partyDetails.getPartyType().getId()));
            partyDetails.setStatus('y');
            String encodedPassword = bCryptPasswordEncoder.encode(partyDetails.getPassword());
            partyDetails.setPassword(encodedPassword);
            partyDetails.setState(stateRepository.findById(partyDetails.getState().getStateFullCode()).get());
            partyDetails.setCountry(countryRepository.findById(partyDetails.getCountry().getCountryCode3()).get());
            detailsRepository.save(partyDetails);
            userAuthRepository.save(new UserDetails(partyDetails.getPartyEmail(), encodedPassword, 1, "party", partyDetails.getPrimaryPhone()));
            returnObject.put("message", "success");
            return returnObject;
        }
        else {
            returnObject.put("message", "user already exists");
            returnObject.put("data", null);
        }
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
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

    @Transactional(rollbackFor=Exception.class)
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

    @Transactional(rollbackFor=Exception.class)
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

    @Transactional(rollbackFor=Exception.class)
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
        if (partyDetails==null){
            partyDetails = detailsRepository.findByPrimaryPhone(username);
        }
        if (partyDetails==null){
            returnObject.put("message", "no such user");
            return returnObject;
        }
        detachParty(partyDetails);
        partyDetails.setPassword("");
        returnObject.put("message", "success");
        returnObject.put("data", partyDetails);
        return returnObject;
    }

//    @Transactional(rollbackFor=Exception.class)
//    public HashMap<String, Object> sendOTP(String email){
//        logger.info(email);
//        returnObject = new HashMap<>();
//        Random r = new Random();
//        int otp = (int)(r.nextFloat()*899900) + 100000;
//        try {
//            emailService.sendMail(email, "Your OTP for account verification is " + otp, "Please verify your account");
//            otpService.saveOtp(new OTP(otp, email));
//            returnObject.put("message", "success");
//        }
//        catch (Exception e){
//            returnObject.put("exception", e);
//            returnObject.put("message", "some exception occurred");
//        }
//        finally {
//            return returnObject;
//        }
//    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> forgotPassword(String phone) {
        returnObject = new HashMap<>();
        PartyDetails found = detailsRepository.findByPrimaryPhone(phone);
        if (found!=null){
            String generatedPassword = new GeneratePassword().generatePassword();
            String encodedPassword = bCryptPasswordEncoder.encode(generatedPassword);
            found.setPassword(encodedPassword);
            detailsRepository.save(found);
            UserDetails userDetails = userAuthRepository.findByUsername(phone);
            userDetails.setPassword(encodedPassword);
            userAuthRepository.save(userDetails);
            // Send Email
            HashMap<String, String> json = new HashMap<>();
            json.put("phone", found.getPrimaryPhone());
            json.put("password", generatedPassword);
            try {
                restTemplate.postForLocation(serverURL + "/notifications/api/sms/forgot-password", json);
            } catch (RestClientException e) {
                throw(e);
            }
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public PartyDetails findById(Integer id){
        return detailsRepository.findByPartyId(id);
    }

    public HashMap<String, Object> search(String query) {
        returnObject = new HashMap<>();
        returnObject.put("data", detailsRepository.search(query));
        return returnObject;
    }
}
