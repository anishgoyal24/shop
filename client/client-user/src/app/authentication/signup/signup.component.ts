import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { UserService } from 'src/shared/services/user.service';

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

  accountDetails = {
    partyName: "",
    partyEmail: "",
    contactPerson: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    password: "",
    partyType: {
      id: 102
    }
  }

  states = ['Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 
    'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal'
];

  constructor(
    private _location: Location,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private utilityService: UtilityService,
    private userService: UserService
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
  }

  createAccount(accountDetails: any){
    this.utilityService.asyncNotification('Sending OTP...', 
      new Promise((resolve, reject)=>{
        this.userService.register(accountDetails, this.otp)
        .then((res)=>{
          if (res['message']=='success'){
            this.saveToSession(res['data']);
            resolve(this.utilityService.resolveAsyncPromise('OTP Successfully Sent!'))
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
