import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categoriesList: any;

  async ngOnInit() {
    await this.getAllCategories();
  }

  async getAllCategories() {
    try {
      return new Promise((resolve, reject) => {
        this.categoryService.getAllCategories()
          .subscribe((res) => {
            console.log(res);
            this.categoriesList = res['data'];
            resolve();
          }, (err) => {
            console.log('Categories not fetched', err);
            reject(err);
          })
      })
    } catch (err) {
      console.log('Internal Server Error', err);
    }
  }

  async deleteCategory(categoryData, index){
    try{
      return new Promise((resolve, reject)=>{
        this.categoryService.deleteCategory(categoryData)
        .subscribe((res)=>{
          this.categoriesList.splice(index, 1);
          console.log('Category Deleted', res);
          resolve();
        }, (err) => {
          console.log('Category not deleted', err);
          reject(err);
        })
      })
    } catch(err){
      console.log('Internal Server Error', err);
    }
  }

}
