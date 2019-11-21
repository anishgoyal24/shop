import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit {

  constructor(
    private categoryService: CategoryService, 
    private ngxService: NgxUiLoaderService, 
    private snotifyService: UtilityService
  ) { }

  // CATEGORIES DATA
  categoriesList: any;
  categoryQuery = "";

  // LENGTH OF CATEGORY LISY
  listLength = -1;

  // CATEGORY DATA MODEL
  categoryModel: {category: string, description: string, id: string}={
    category: null,
    description: null,
    id: null
  }

  // BEHAVIOUR SUBJECT FOR LOADING QUERY
  isLoadingQuery$ = new BehaviorSubject(false);

  async ngOnInit() {
    await this.getAllCategories();
  }

  /**
   * This function is responsible for making a GET request to fetch all the categories from the server
   */
  async getAllCategories() {
    try {
      this.ngxService.startBackground();
      return new Promise((resolve, reject) => {
        this.categoryService.getAllCategories()
          .subscribe((res) => {
            this.categoriesList = res['data'];
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
      this.snotifyService.errorNotification("Some internal server occured, kindly check after some time...");
    }
  }

  /**
   * This function is responsible for deleting the category from the @name categoriesList array
   * @param categoryData 
   * @param index 
   */
  async deleteCategory(categoryData: Object, index: number){
    try{
      this.snotifyService.confirmNotification("Are you sure, you want to remove this category?",'', {
        timeout: 5000,
        type: 'warning',
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        buttons: [
          {text: 'Yes', action: () => {
            this.snotifyService.asyncNotification('Please wait while we are deleting the category for you', new Promise((resolve, reject)=>{
              this.categoryService.deleteCategory(categoryData)
              .subscribe((res)=>{
                this.categoriesList.splice(index, 1);
                // console.log('Category Deleted', res);
                this.listLength = this.categoriesList.length;
                resolve(this.snotifyService.resolveAsyncPromise('Category Removed!'));
              }, (err) => {
                console.log('Category not deleted', err);
                reject(this.snotifyService.rejectAsyncPromise("Failed to remove category, please try again!"));
              })
            }))
          }, bold: false},
          {text: 'No', action: (toast) => { this.snotifyService.removeToast(toast.id); }, bold: true},
        ]
      })
    } catch(err){
      console.log('Internal Server Error', err);
      this.ngxService.stopBackground();
      this.snotifyService.errorNotification("Some internal server occured, kindly check after some time...");
    }
  }

  /**
   * This function is responsible for making a search in categoryArray
   * @param categoryName - pass the name of category which you are looking for
   */
  async searchQuery(categoryName: string){
    try{
      if(this.listLength > 0){
        this.ngxService.startBackground();
        return new Promise((resolve, reject) => {
          this.categoryService.searchCategory(categoryName.toLowerCase())
          .subscribe((res)=>{
            // console.log('Categories Found', res);
            this.categoriesList = res['data'];
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
      this.snotifyService.errorNotification("Some internal server occured, kindly check after some time...");
    }
  }

  async editCategory(categoryData, categoryObj){
    try{
      // console.log(categoryData, categoryObj);
      categoryObj.category = categoryData.category;
      categoryObj.description = categoryData.description;
      categoryObj.id = categoryData.id;
      this.snotifyService.asyncNotification('Please wait, we are processing your request...', new Promise((resolve, reject)=>{
        this.categoryService.editCategory(categoryData)
        .subscribe((res)=>{
          // console.log('Category Edited', res);
          // this.snotifyService.infoNotfication("Category edited!");
          resolve(this.snotifyService.resolveAsyncPromise('Category has been edited successfully!'));
        }, (err)=>{
          console.log('Category not edited', err);
          reject(this.snotifyService.rejectAsyncPromise("Failed to edit the category, please try again!"));
        })
      })) 
    } catch(err){
      console.log('Internal Server Error', err);
      this.snotifyService.errorNotification("Some internal server occured, kindly check after some time...");
    }
  }

}
