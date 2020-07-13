import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/shared/services/party.service';
import { PartyHomeComponent } from '../../party/party-home/party-home.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { CommonService } from 'src/shared/services/common.service';

@Component({
  selector: 'app-party-new-customer',
  templateUrl: './party-new-customer.component.html',
  styleUrls: ['./party-new-customer.component.scss']
})
export class PartyNewCustomerComponent implements OnInit {

  constructor(
    private partyService: PartyService,
    private utilityService: UtilityService,
    private commonService: CommonService
    ) { }
  
  /**
   * Defining account details object for which a new account will be created
   */
  accountDetails: {partyName: string, partyEmail: string, contactPerson: string,  primaryPhone: Number, secondaryPhone: Number, address: string, city: string, state: any, country: any, pincode: number, password: string, partyType: any} = {
    partyName: null,
    partyEmail: null,
    primaryPhone: null,
    secondaryPhone: null,
    contactPerson: null,
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
    partyType: {
      id: 0
    }
  }

  countriesList = [];

  statesList = [];

  selectedCountry: string;

  selectedState: string;

  partyHomeComponent = new PartyHomeComponent(this.partyService);

  parties:any = [];

  selectedParty: any;

  public isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    this.isLoading$.next(true);
    this.parties = await this.partyHomeComponent.getAllParties()
    .finally(()=> this.isLoading$.next(false))
    this.parties = this.parties.filter(party=> party.status === 'y');
    console.log(this.parties)
    this.getCountriesList();
  }

  async sendOTP(email: string){
    this.utilityService.asyncNotification('Please wait, we are sending the OTP to your email address...', 
    new Promise((resolve, reject)=>{
      this.partyService.sendOTP(email)
      .then((res)=> {
        console.log(res);
        resolve(this.utilityService.resolveAsyncPromise('OTP Sent, please check your email!'));
      })
      .catch(()=> reject(this.utilityService.rejectAsyncPromise('Oops, an error occured, please try again!')))
    }))
  }

  async createNewAccount(){

  }

  async createAccount(accountDetails: Object){
    console.log(accountDetails);
    this.utilityService.asyncNotification('Please wait, we are creating the new customer account...', 
    new Promise((resolve, reject)=>{
      this.partyService.newCustomer(accountDetails)
      .then((res)=> {
        console.log(res);
        this.clearForm();
        resolve(this.utilityService.resolveAsyncPromise('New Customer account Created!'));
      })
      .catch(()=> reject(this.utilityService.rejectAsyncPromise('Oops, an error occured, please try again!')))
    }))
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

  clearForm(){
    this.accountDetails.partyName = null;
    this.accountDetails.partyEmail = null;
    this.accountDetails.primaryPhone = null;
    this.accountDetails.secondaryPhone = null;
    this.accountDetails.contactPerson = null;
    this.accountDetails.address = null;
    this.accountDetails.city = null;
    this.accountDetails.state.stateFullCode = null;
    this.accountDetails.country.countryCode3 = null;
    this.accountDetails.pincode = null;
    this.accountDetails.password = null;
    this.accountDetails.partyType.id = 0;
    this.selectedCountry = null;
    this.selectedState = null;
    this.selectedParty = null;
  }

}
