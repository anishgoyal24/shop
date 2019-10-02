import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxUiLoaderService, Loader, SPINNER } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AdminService } from 'src/shared/services/admin.service';
import { SnotifyService, SnotifyPosition, SnotifyToastConfig } from 'ng-snotify';
import { BehaviorSubject } from 'rxjs';

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
    private adminService: AdminService,
    private snotifyService: SnotifyService) { }

  userName: String;
  password: String;

  isLoading$ = new BehaviorSubject(false);

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
        this.isLoading$.next(true);
        this.adminService.authenticate(userData)
          .subscribe((res) => {
            //console.log('Successfully Logged In', res.headers.keys());
            if (res.headers.get('Authorization')) {
              //this.snotifyService.success('Example body content');
              localStorage.setItem("token", res.headers.get('Authorization').split(" ")[1]);
              this.isLoading$.next(false);
              this.router.navigate(['/dashboard', 'overview']);
            }

          }, (err) => {
            console.log('HTTP Response Error', err);
          })


      }

    } catch (err) {
      console.log('Internal Server Error, please try again later!');
    }
  }

}
