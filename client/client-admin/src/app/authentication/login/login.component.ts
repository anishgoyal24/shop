import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AdminService } from 'src/shared/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _location: Location,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private adminService: AdminService) { }

  userName: String;
  password: String;

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

  backClicked() {
    this._location.back();
  }

  login() {
    try {
      let userData = {
        username: this.userName,
        password: this.password
      }

      if (userData) {
        this.adminService.authenticate(userData)
          .subscribe((res) => {
            //console.log('Successfully Logged In', res);
            // if(res.headers.get('Authorization')){
            //   this.router.navigate(['/dashboard', 'overview']);
            // }
            console.log(res.headers.keys())
             
          }, (err) => {
            console.log('HTTP Response Error', err);
          })
      }

    } catch (err) {
      console.log('Internal Server Error, please try again later!');
    }
  }

}
