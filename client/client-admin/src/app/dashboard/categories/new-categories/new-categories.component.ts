import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { SnotifyService } from 'ng-snotify';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.scss']
})
export class NewCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private snotifyService: SnotifyService, private utilityService: UtilityService) { }

  categoryName: any;
  categoryDescription: any;
  partyType: any;

  async ngOnInit() {

  }

  async createNewCategory() {
    try {
      this.utilityService.asyncNotification('Creating new category, please wait...', new Promise((resolve, reject) => {
        let categoryData = {
          category: this.categoryName,
          description: this.categoryDescription
        }
        if (categoryData) {
          this.categoryService.addCategory(categoryData)
            .subscribe((res) => {
              // console.log('Headers List', res.headers.keys());
              console.log('Category Added', res);
              this.categoryName = "";
              if (res['message'] == "success")
                resolve(this.utilityService.resolveAsyncPromise('Category added!'));
              else
                reject(this.utilityService.rejectAsyncPromise('Category already exist'));
            }, (err) => {
              // console.log('Headers List', err.headers.keys());
              console.log('Category Not added', err);
              // this.snotifyService.error("Category not added, please try again!");
              reject(this.utilityService.rejectAsyncPromise('Unable to add the category, please try again'));
            })
        }
      })) 
    } catch (err) {
      console.log('Internal Server Error', err);
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }

  }

}
