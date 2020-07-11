import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';
import { CommonService } from 'src/shared/services/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  selectedState: any;

  otpRequested: boolean = false;

  otp: any;

  otpHash: any;

  formCheck: any;

  accountDetails = {
    partyName: "",
    partyEmail: "",
    contactPerson: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    state: {
      stateFullCode: 0
    },
    country: {
      countryCode3: 'IND'
    },
    pincode: "",
    password: "",
    partyType: {
      id: 102
    }
  }

  states = [];

  constructor(
    private _location: Location,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private utilityService: UtilityService,
    private userService: UserService,
    private commonService: CommonService
  ) { }

  backClicked() {
    this._location.back();
  }

  isLoading$ = new BehaviorSubject(false);

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    new Promise((resolve, reject)=>{
      this.commonService.getStates('IND').then((res)=>{
        this.states = res['data'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

  createAccount(accountDetails: any){
    this.utilityService.asyncNotification('Registering customer...', 
      new Promise((resolve, reject)=>{
        this.userService.register(accountDetails)
        .then((res)=>{
          if (res['message']=='success'){
            console.log(res);
            resolve(this.utilityService.resolveAsyncPromise('Successfully Registered User!'))
          }
          else{
            reject(this.utilityService.rejectAsyncPromise('Oops some error occurred! Please try again later.'));
          }
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise('Oops some error occurred! Please try again later.'));
        })
      })
    )
  }


  getOtp(partyEmail: string){
    this.utilityService.asyncNotification('Sending OTP...', 
      new Promise((resolve, reject)=>{
        this.userService.getOtp(partyEmail)
        .then((res)=>{
            this.otpRequested = true;
            this.otpHash = res['hash']
            resolve(this.utilityService.resolveAsyncPromise('OTP Successfully Sent!'))

        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise('Oops some error occurred! Please try again later.'));
        })
      })
    )
  }

  verifyOtp(){
    this.utilityService.asyncNotification('Validating OTP...', 
    new Promise((resolve, reject)=>{
      this.userService.verifyOtp(this.accountDetails.partyEmail, this.otp, this.otpHash)
      .then((res)=>{
          
          resolve(this.utilityService.resolveAsyncPromise('OTP Verified!'))

      }).catch((err)=>{
        reject(this.utilityService.rejectAsyncPromise('Wrong OTP, please check your email!'));
      })
    })
  )
  }


  saveToSession(partyDetails: any){
    console.log(partyDetails);
    sessionStorage.setItem("partyEmail", partyDetails['partyEmail']);
    sessionStorage.setItem("partyType", partyDetails['partyType']);
    sessionStorage.setItem("primaryPhone", partyDetails['primaryPhone']);
    sessionStorage.setItem("partyName", partyDetails['partyName']);
    sessionStorage.setItem("state", partyDetails['state']);
  }

}
