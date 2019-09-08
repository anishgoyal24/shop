import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
  }

}
