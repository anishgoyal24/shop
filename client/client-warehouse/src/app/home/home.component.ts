import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

}
