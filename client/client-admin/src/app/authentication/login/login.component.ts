import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _location: Location, 
    private ngxService: NgxUiLoaderService, 
    private router: Router) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

  backClicked() {
    this._location.back();
  }

  login(){
    try{
      this.router.navigate(['/dashboard', 'overview']);
    } catch(err){

    }
  }

}
