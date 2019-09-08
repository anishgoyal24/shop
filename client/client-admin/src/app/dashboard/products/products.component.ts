import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService,
    private router: Router ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

}
