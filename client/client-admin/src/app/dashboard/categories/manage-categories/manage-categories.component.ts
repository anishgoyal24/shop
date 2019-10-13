import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private ngxService: NgxUiLoaderService, private snotifyService: SnotifyService) { }

  categoriesList: any;
  categoryQuery = "";

  listLength = -1;

  editStatus = false;

  categoryModel={
    category: '',
    description:'',
    id: ''
  }

  isLoadingQuery$ = new BehaviorSubject(false);

  async ngOnInit() {
    await this.getAllCategories();
  }

  firstLetterCaptialise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async getAllCategories() {
    try {
      this.ngxService.startBackground();
      return new Promise((resolve, reject) => {
        this.categoryService.getAllCategories()
          .subscribe((res) => {
            // console.log(res);
            this.categoriesList = res['data'];
            res['data'].forEach(element => {
              element.category = this.firstLetterCaptialise(element.category);
            });
            this.listLength = res['data'].length;
            this.ngxService.stopBackground();
            resolve();
          }, (err) => {
            console.log('Categories not fetched', err);
            this.ngxService.stopBackground();
            reject(err);
          })
      })
    } catch (err) {
      console.log('Internal Server Error', err);
      this.ngxService.stopBackground();
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }
  }

  async deleteCategory(categoryData, index){
    try{
      this.snotifyService.confirm("Are you sure, you want to remoce this category?", {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          {text: 'Yes', action: () => {
            this.ngxService.startBackground();
            return new Promise((resolve, reject)=>{
              this.categoryService.deleteCategory(categoryData)
              .subscribe((res)=>{
                this.categoriesList.splice(index, 1);
                // console.log('Category Deleted', res);
                this.listLength = this.categoriesList.length;
                this.ngxService.stopBackground();
                this.snotifyService.info("Category removed!");
                resolve();
              }, (err) => {
                console.log('Category not deleted', err);
                this.ngxService.stopBackground();
                this.snotifyService.error("Failed to remove category, please try again!");
                reject(err);
              })
            })
          }, bold: false},
          {text: 'No', action: (toast) => { this.snotifyService.remove(toast.id); }, bold: true},
        ]
      })
    } catch(err){
      console.log('Internal Server Error', err);
      this.ngxService.stopBackground();
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }
  }

  async searchQuery(categoryName){
    try{
      if(this.listLength > 0){
        this.ngxService.startBackground();
        return new Promise((resolve, reject) => {
          this.categoryService.searchCategory(categoryName.toLowerCase())
          .subscribe((res)=>{
            // console.log('Categories Found', res);
            this.categoriesList = res['data'];
            res['data'].forEach(element => {
              element.category = this.firstLetterCaptialise(element.category);
            });
            if(res['data'].length == 0)
              this.isLoadingQuery$.next(true);
            else
              this.isLoadingQuery$.next(false);
  
            this.ngxService.stopBackground();
            resolve();
          }, (err) =>{
            console.log('Categories not found', err);
            this.ngxService.stopBackground();
            this.isLoadingQuery$.next(false);
            reject(err);
          })
        })
      }
    } catch(err){
      console.log('Internal Server Error', err);
      this.isLoadingQuery$.next(false);
      this.ngxService.stopBackground();
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }
  }

  async editCategory(categoryData, categoryObj){
    try{
      // console.log(categoryData, categoryObj);
      categoryObj.category = categoryData.category;
      categoryObj.description = categoryData.description;
      categoryObj.id = categoryData.id;
      return new Promise((resolve, reject)=>{
        this.categoryService.editCategory(categoryData)
        .subscribe((res)=>{
          // console.log('Category Edited', res);
          this.snotifyService.info("Category edited!");
          resolve()
        }, (err)=>{
          console.log('Category not edited', err);
          this.snotifyService.error("Failed to edit the category, please try again!");
          reject(err);
        })
      })
    } catch(err){
      console.log('Internal Server Error', err);
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }
  }

}
