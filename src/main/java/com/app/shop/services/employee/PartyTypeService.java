package com.app.shop.services.employee;

import com.app.shop.entity.PartyType;
import com.app.shop.repository.employee.PartyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class PartyTypeService {

    @Autowired
    private PartyTypeRepository partyTypeRepository;
    private HashMap<String, Object> returnObject;

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addPartyType(PartyType partyType){
        returnObject = new HashMap<>();
        PartyType foundPartyType = partyTypeRepository.findByType((partyType.getType()));
        if (foundPartyType==null){
            partyType.setStatus('y');
            partyTypeRepository.save(partyType);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "type already exists");
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> deletePartyType(int id){
        returnObject = new HashMap<>();
        if (partyTypeRepository.findById(id).isPresent()){
            PartyType foundPartyType = partyTypeRepository.findById(id).get();
            foundPartyType.setStatus('n');
            partyTypeRepository.save(foundPartyType);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "no such party type");
        return returnObject;
    }

    public HashMap<String, Object> listAll(){
        returnObject = new HashMap<>();
        List<PartyType> partyTypes = partyTypeRepository.findAll();
        returnObject.put("message", "success");
        returnObject.put("data", partyTypes);
        return returnObject;
    }

    public PartyType getType(Integer id){
        return partyTypeRepository.findById(id).get();
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> enablePartyType(Integer partyId){
        returnObject = new HashMap<>();
        Optional<PartyType> optional = partyTypeRepository.findById(partyId);
        if (optional.isPresent()) {
            PartyType foundPartyType = optional.get();
            foundPartyType.setStatus('y');
            partyTypeRepository.save(foundPartyType);
            returnObject.put("message", "success");
        }
        else returnObject.put("message", "no such party id");
        return returnObject;
    }
}
