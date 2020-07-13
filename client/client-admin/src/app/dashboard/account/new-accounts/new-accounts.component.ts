import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { AdminService } from 'src/shared/services/admin.service';
import { SubSink } from 'subsink';
import { CommonService } from 'src/shared/services/common.service';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.component.html',
  styleUrls: ['./new-accounts.component.scss']
})
export class NewAccountsComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private adminService: AdminService,
    private commonService: CommonService
  ) { }

  /**
   * Defining account details object for which a account will be created
   */
  accountDetails: {empName: string, empEmail: string, primaryPhone: Number, address: string, city: string, state: any, country: any, pincode: number, password: string, role: string} = {
    empName: null,
    empEmail: null,
    primaryPhone: null,
    address: null,
    city: null,
    state: {
      stateFullCode: null
    },
    country: {
      countryCode3: null
    },
    pincode: null,
    password: null,
    role: null
  }

  // UNSUBSCRIBE THE DATA
  private subSink = new SubSink();

  // Countries List
  countriesList = [];

  // States List
  statesList = [];

  // Selected Country
  selectedCountry: string;

  // Selected State
  selectedState: string;

  // EMPLOYEES DATA
  employees: any;

  async ngOnInit() {
    this.adminService.currentData.subscribe((res)=> this.employees = res);
    this.getCountriesList();
  }

  /**
   * This function is resposible for creating new accounts for users
   * @param accountDetails 
   * Requires the role of an admin or the owner in order to operate
   */
  async createAccount(accountDetails: Object){
    try{
      this.utilityService.asyncNotification('Please hold on, we are processing your request...', 
      new Promise((resolve, reject)=>{
        this.subSink.add(this.adminService.createNewAccount(accountDetails)
        .subscribe((res)=>{
          this.employees.push(accountDetails);
          this.adminService.changeData(this.employees);
          console.log('New account has been created', res);
          this.clearForm();
          resolve(this.utilityService.resolveAsyncPromise('New Account has been created!'));
        }, (err)=>{
          console.log('Some error has occured while creating a new account', err);
          reject(this.utilityService.rejectAsyncPromise('Some error occured while creating this new account!'))
        }))
      }))
    } catch(err){
      console.log('There\'s some unexpected error occurred, please try again later!', err);
      this.utilityService.errorNotification('There\'s some unexpected error occurred, please try again later!');
    }
  }

  getCountriesList(){
    new Promise((resolve, reject)=>{
      this.commonService.getCountries().then((res)=>{
        this.countriesList = res['data'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }


  getStatesList(country: string){
    new Promise((resolve, reject)=>{
      this.commonService.getStates(country).then((res)=>{
        this.statesList = res['data'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }
  
  /**
   * This Function unsubscribes from all the active subscriptions
   */
  ngOnDestroy(): void{
    this.subSink.unsubscribe();
  }

  clearForm(){
    this.accountDetails.empName = null;
    this.accountDetails.empEmail = null;
    this.accountDetails.primaryPhone = null;
    this.accountDetails.address = null;
    this.accountDetails.city = null;
    this.accountDetails.state.stateFullCode = null;
    this.accountDetails.country.countryCode3 = null;
    this.accountDetails.pincode = null;
    this.accountDetails.password = null;
    this.accountDetails.role = null;
    this.selectedCountry = null;
    this.selectedState = null;
  }

}
