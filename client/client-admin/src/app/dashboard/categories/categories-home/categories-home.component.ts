import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  constructor(private categoryService: CategoryService, private ngxService: NgxUiLoaderService,) { }

  categoriesList: any;
  categoryQuery = "";

  listLength = -1;

  isLoadingQuery$ = new BehaviorSubject(false);

  async ngOnInit() {
    await this.getAllCategories();
  }

  async getAllCategories() {
    try {
      this.ngxService.startBackground();
      return new Promise((resolve, reject) => {
        this.categoryService.getAllCategories()
          .subscribe((res) => {
            console.log(res);
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
    }
  }

  async searchQuery(categoryName){
    try{
      if(this.listLength > 0){
        this.ngxService.startBackground();
        return new Promise((resolve, reject) => {
          this.categoryService.searchCategory(categoryName)
          .subscribe((res)=>{
            console.log('Categories Found', res);
            this.categoriesList = res['data'];
            if(res['data'].length == 0)
              this.isLoadingQuery$.next(true);
             else
              this.isLoadingQuery$.next(false);
  
            this.ngxService.stopBackground();
            resolve();
          }, (err) =>{
            console.log('Categories not found', err);
            this.isLoadingQuery$.next(false);
            this.ngxService.stopBackground();
            reject(err);
          })
        })
      }
    } catch(err){
      console.log('Internal Server Error', err);
      this.isLoadingQuery$.next(false);
      this.ngxService.stopBackground();
    }
  }

}
