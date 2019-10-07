import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.scss']
})
export class NewCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService, private snotifyService: SnotifyService) { }

  categoryName: any;

  async ngOnInit() {

  }

  async createNewCategory() {
    try {
      return new Promise((resolve, reject) => {
        let categoryData = this.categoryName
        if (categoryData) {
          this.categoryService.addCategory(categoryData)
            .subscribe((res) => {
              // console.log('Headers List', res.headers.keys());
              console.log('Category Added', res);
              this.categoryName = "";
              if(res['message'] == "success")
                this.snotifyService.success("New category added!");
              else 
                this.snotifyService.warning("Category already exists!");
              resolve();
            }, (err) => {
              // console.log('Headers List', err.headers.keys());
              console.log('Category Not added', err);
              this.snotifyService.error("Category not added, please try again!");
              reject();
            })
        }
      })
    } catch (err) {
      console.log('Internal Server Error', err);
      this.snotifyService.error("Some internal server occured, kindly check after some time...");
    }

  }

}
