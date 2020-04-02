package com.app.shop.controllers.employee;

import com.app.shop.entity.Category;
import com.app.shop.services.employee.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

// Controller to manage product categories
@RestController
@RequestMapping(value = "/category")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

//  List all categories
    @GetMapping(value = "/list")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> getList(){
        return categoryService.listAll();
    }


//  Add a category
    @PostMapping(value = "/new")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> addCategory(@RequestBody Category category){
        return categoryService.addCategory(category);
    }

//  Delete a category
    @PostMapping(value = "/delete")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> deleteCategory(@RequestBody String category){
        return categoryService.removeCategory(category);
    }

//  Edit a category
    @PostMapping(value = "/edit")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> editCategory(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

//  Search a category
    @GetMapping(value = "/search")
    @PreAuthorize("hasAnyAuthority('ROLE_employee', 'ROLE_admin', 'ROLE_owner')")
    public HashMap<String, Object> searchCategory(@RequestParam String cat){
        return categoryService.search(cat);
    }

}
