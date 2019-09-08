import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService,
    private router: Router ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    // this.router.navigate(['/dashboard', 'categories', 'home']);
  }

}
