import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { AdminService } from 'src/shared/services/admin.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';

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
    private utilityService: UtilityService
  ) { }

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
        this.utilityService.asyncNotification('Please wait we are logging you in!', new Promise((resolve, reject) => {
          this.adminService.authenticate(userData)
            .subscribe((res) => {
              console.log('Successfully Logged In', res.headers.keys());
              if (res.headers.get('Authorization')) {
                //this.snotifyService.success('Example body content');
                sessionStorage.setItem("token", res.headers.get('Authorization').split(" ")[1]);
                this.isLoading$.next(false);
                this.router.navigate(['/dashboard', 'overview']);
                resolve(this.utilityService.resolveAsyncPromise(`Welcome back ${userData.username}!`))
              }

            }, (err) => {
              console.log('HTTP Response Error', err);
              reject(this.utilityService.rejectAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`))
            })
        }))

      }

    } catch (err) {
      console.log('Internal Server Error, please try again later!');
    }
  }

}
