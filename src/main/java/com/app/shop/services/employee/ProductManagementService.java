package com.app.shop.services.employee;

import com.app.shop.entity.Category;
import com.app.shop.entity.ItemDetails;
import com.app.shop.entity.ItemPackingDetails;
import com.app.shop.repository.employee.ProductManagementRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ProductManagementService {

    @Autowired
    private ProductManagementRepository productManagementRepository;
    HashMap<String, Object> returnObject;
    @Autowired
    private CategoryService categoryService;

    public HashMap<String, Object> addProduct(String itemDetail, MultipartFile image) {
        returnObject = new HashMap<>();
        ItemDetails itemDetails = null;
        Gson gson = new Gson();
        itemDetails = gson.fromJson(itemDetail, ItemDetails.class);
        if (productManagementRepository.findByItemName(itemDetails.getItemName())==null) {
            itemDetails.setStatus('y');
            if (itemDetails.getItemPackingDetails()!=null){
                for(ItemPackingDetails itemPackingDetails : itemDetails.getItemPackingDetails()) {
                    itemPackingDetails.setStatus('y');
                    itemPackingDetails.setItemDetails(itemDetails);
                }
            }
            Set<Category> categoryList = new HashSet<>();
            if (itemDetails.getCategories()!=null){
                for (Category category : itemDetails.getCategories())
                    categoryList.add(categoryService.getCategory(category.getId()));
            }
            itemDetails.setCategories(categoryList);
            itemDetails.setImage(image.getOriginalFilename());
            productManagementRepository.save(itemDetails);
            uploadImage(image);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> deleteProduct(int itemId){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemId);
        if (foundItemDetails!=null){
            foundItemDetails.setStatus('n');
            for (ItemPackingDetails itemPackingDetails: foundItemDetails.getItemPackingDetails())
                itemPackingDetails.setStatus('n');
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;

    }

    public HashMap<String, Object> addPacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : itemDetails.getItemPackingDetails()) {
                itemPackingDetails.setStatus('y');
                foundItemDetails.getItemPackingDetails().add(itemPackingDetails);
            }
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> deletePacking(ItemDetails itemDetails){
        returnObject = new HashMap<>();
        ItemDetails foundItemDetails = productManagementRepository.findByItemId(itemDetails.getItemId());
        if (foundItemDetails!=null){
            for (ItemPackingDetails itemPackingDetails : foundItemDetails.getItemPackingDetails()){
                if (itemPackingDetails.getSize() == itemDetails.getItemPackingDetails().get(0).getSize())
                    itemPackingDetails.setStatus('n');
            }
            productManagementRepository.save(foundItemDetails);
            returnObject.put("message", "success");
        }
        else
            returnObject.put("message", "failure");
        return returnObject;
    }

    public HashMap<String, Object> listProducts(){
        returnObject = new HashMap<>();
        List<ItemDetails> itemDetailsList =  productManagementRepository.findAll();
        returnObject.put("data", itemDetailsList);
        return returnObject;
    }

    private String uploadImage(MultipartFile image){
        if (image.isEmpty())return "failure";
        try{
            byte[] bytes = image.getBytes();
            String UPLOADED_FOLDER="src/main/assets/images/product/";
            Path path = Paths.get(UPLOADED_FOLDER + image.getOriginalFilename());
            Files.write(path, bytes);
            return "success";
        }
        catch (Exception e){
            return "Exception failure"+e+" ";
        }
    }
}
