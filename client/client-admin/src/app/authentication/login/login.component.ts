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

  userName: string;
  password: string;

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
              if (res.headers.get('Authorization')) {
                sessionStorage.setItem("token", res.headers.get('Authorization').split(" ")[1]);
                this.getDetails(this.userName).then(()=>{
                  let empName = sessionStorage.getItem('empName');
                  this.isLoading$.next(false);
                  this.router.navigate(['/dashboard', 'overview']);
                  resolve(this.utilityService.resolveAsyncPromise('Welcome back! ' + empName));
                }).catch((err)=>{
                  sessionStorage.clear();
                  reject(this.utilityService.rejectAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`));
                });
              }
              else {
                sessionStorage.clear();
                reject(this.utilityService.rejectAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`));
              }

            }, (err) => {
              console.log('HTTP Response Error', err);
              sessionStorage.clear();
              reject(this.utilityService.rejectAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`))
            })
        }))

      }

    } catch (err) {
      console.log('Internal Server Error, please try again later!');
    }
  }


  getDetails(username: string){
    return new Promise((resolve, reject)=>{
      this.adminService.getDetails(username)
      .then((res)=>{
      if (res['message']=='found'){
        var userDetails = res['data'];
        sessionStorage.setItem("empEmail", userDetails['empEmail']);
        sessionStorage.setItem("primaryPhone", userDetails['primaryPhone']);
        sessionStorage.setItem("state", userDetails['state']['stateFullCode']);
        sessionStorage.setItem("city", userDetails['city']);
        sessionStorage.setItem("empId", userDetails['empId']);
        sessionStorage.setItem("empName", userDetails['empName']);
        sessionStorage.setItem("role", userDetails['role']);
        resolve();
      }
      else {
        sessionStorage.clear();
        reject();
      }
    }).catch((err)=>{
      console.log(err);
      reject();
    })
    })
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }

}
