import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private _location: Location,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private utilityService: UtilityService,
    private userService: UserService
  ){ }

  backClicked() {
    this._location.back();
  }

  isLoading$ = new BehaviorSubject(false);

  ngOnInit(){
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

  login(){
    try {
      let userData = {
        username: this.username,
        password: this.password
      };
      if (userData){
        this.isLoading$.next(true);
        this.utilityService.asyncNotification('Please wait while we are logging you in!', new Promise((resolve, reject)=>{
          this.userService.authenticate(userData)
          .then((res: any)=>{
            if (res.headers.get('Authorization')){
              sessionStorage.setItem("token", res.headers.get('Authorization').split(" ")[1]);
              this.getDetails().then(()=>{
                let partyName = sessionStorage.getItem('partyName');
                resolve(this.utilityService.resolveAsyncPromise('Welcome back! ' + partyName));
                this.router.navigate(['dashboard', 'products']);
              });
            }
          }).catch((err)=>{
            console.log(err);
            reject(this.utilityService.rejectAsyncPromise('Oops some error occurred while logging you in, please try again later!'))
          })
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  getDetails(){
    return new Promise((resolve, reject)=>{
      this.userService.getDetails(this.username)
      .then((res)=>{
      if (res['message']=='success'){
        var userDetails = res['data'];
        sessionStorage.setItem("partyEmail", userDetails['partyEmail']);
        sessionStorage.setItem("primaryPhone", userDetails['primaryPhone']);
        sessionStorage.setItem("state", userDetails['state']['stateFullCode']);
        sessionStorage.setItem("city", userDetails['city']);
        sessionStorage.setItem("partyType", userDetails['partyType']['type']);
        sessionStorage.setItem("partyId", userDetails['partyId']);
        sessionStorage.setItem("partyName", userDetails['partyName']);
        sessionStorage.setItem("pincode", userDetails['pincode']);
        sessionStorage.setItem("country", userDetails['country']['countryCode3']);
        resolve();
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

  register(){
    this.router.navigate(['signup']);
  }
}
