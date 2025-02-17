package com.app.shop.services.employee;

import com.app.shop.entity.Category;
import com.app.shop.repository.employee.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    private HashMap<String, Object> returnObject;

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> addCategory(Category category1){
        returnObject = new HashMap<>();
        String cat = category1.getCategory().toLowerCase();
        Category found = categoryRepository.findByCategory(cat);
        if (found !=null) {
            if (found.getStatus() == 'n') {
                found.setStatus('y');
                categoryRepository.save(found);
                returnObject.put("message", "success");
                return returnObject;
            } else {
                returnObject.put("message", "duplicate");
                return returnObject;
            }
        }
        category1.setStatus('y');
        categoryRepository.save(category1);
        returnObject.put("message", "success");
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> removeCategory(String cat){
        returnObject = new HashMap<>();
        Category foundCategory = categoryRepository.findByCategory(cat);
        if (foundCategory!=null){
            foundCategory.setStatus('n');
            categoryRepository.save(foundCategory);
            returnObject.put("message", "success");
        }
        else returnObject.put("message", "no such category");
        return returnObject;
    }

    public HashMap<String, Object> listAll(){
        returnObject = new HashMap<>();
        List<Category> categories = categoryRepository.findByStatus('y');
        returnObject.put("message", "success");
        returnObject.put("data", categories);
        return returnObject;
    }

    @Transactional(rollbackFor=Exception.class)
    public HashMap<String, Object> updateCategory(Category category){
        returnObject = new HashMap<>();
        Optional<Category> foundCategory = categoryRepository.findById(category.getId());
        if (foundCategory.isPresent()){
            Category found = foundCategory.get();
            found.setCategory(category.getCategory());
            found.setDescription(category.getDescription());
            categoryRepository.save(found);
            returnObject.put("message", "success");
            returnObject.put("data", found);
        }
        else{
            returnObject.put("message", "no such category");
        }
        return returnObject;
    }

    public HashMap<String, Object> search(String cat) {
        returnObject = new HashMap<>();
        returnObject.put("message", "success");
        returnObject.put("data", categoryRepository.search(cat));
        return returnObject;
    }

    public Category getCategory(int id) {
        return categoryRepository.findById(id).get();
    }

    @Transactional(rollbackFor=Exception.class)
    public void saveCategory(Category category){
        categoryRepository.save(category);
    }
}
