import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/shared/services/category.service';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  async ngOnInit() {
    await this.getAllCategories();
  }

  async getAllCategories() {
    try {
      return new Promise((resolve, reject) => {
        this.categoryService.getAllCategories()
          .subscribe((res) => {
            console.log(res);
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

}
