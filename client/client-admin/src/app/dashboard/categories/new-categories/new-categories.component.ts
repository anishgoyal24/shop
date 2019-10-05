import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-new-categories',
  templateUrl: './new-categories.component.html',
  styleUrls: ['./new-categories.component.scss']
})
export class NewCategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  categoryName: any;

  async ngOnInit() {

  }

  async createNewCategory() {
    try {
      return new Promise((resolve, reject) => {
        let categoryData = {
          name: this.categoryName
        }
        if (categoryData) {
          this.categoryService.addCategory(categoryData)
            .subscribe((res) => {
              console.log('Headers List', res.headers.keys());
              console.log('Category Added', res);
              resolve();
            }, (err) => {
              console.log('Headers List', err.headers.keys());
              console.log('Category Not added', err);
              reject();
            })
        }
      })
    } catch (err) {
      console.log('Internal Server Error', err);
    }

  }

}
