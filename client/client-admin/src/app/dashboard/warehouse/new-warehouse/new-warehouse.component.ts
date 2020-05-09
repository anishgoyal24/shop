import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';
import { CommonService } from 'src/shared/services/common.service';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private warehouseService: WarehouseService,
    private commonService: CommonService
  ) { }
  
  /**
   * Defining account details object for which a new account will be created
   */
  accountDetails: {warehouseName: string, warehouseEmail: string, personOfContact: string,  primaryPhone: Number, secondaryPhone: Number, address: string, city: string, state: any, country: any, pincode: number, password: string, status: string, role: string, type: string, ownerWarehouse: string} = {
    warehouseName: null,
    warehouseEmail: null,
    primaryPhone: null,
    secondaryPhone: null,
    personOfContact: null,
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
    status: 'y',
    role: null,
    type: null,
    ownerWarehouse: null
  }

  // Countries List
  countriesList = [];

  // States List
  statesList = [];

  // Selected Country
  selectedCountry: string;

  // Selected State
  selectedState: string;

  //Static Warehouse List
  warehouseList = [];

  // Selected Owner Warehouse
  selectedOwnerWarehouse: string;

  // Flag to toggle address fields
  addressFields: boolean = true;

  // Owner warehouse state
  ownerState: string;

  // partyHomeComponent = new PartyHomeComponent(this.partyService);

  parties:any = [];

  public isLoading$ = new BehaviorSubject(false);

  ngOnInit() {
    this.getCountriesList();
  }

  createWarehouse(accountDetails: any){
    this.utilityService.asyncNotification('Creating New Warehouse', 
    new Promise((resolve, reject)=>{
      this.warehouseService.createNewWarehouse(accountDetails)
      .then(()=>{
        resolve(this.utilityService.resolveAsyncPromise('Warehouse Created!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Some error occured, while creating the warehouse!'))
      })
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


  getOwnerWarehouseList(state: string){
    new Promise((resolve, reject)=>{
      this.warehouseService.getWarehouseListByState(state).then((res)=>{
        this.warehouseList = res['data'];
        console.log(res);
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }


  toggleAddressFields(){
    this.addressFields = !this.addressFields;
  }
  
  objectIsEmpty(object: any){
    // Object.values(object).every(x => (x === null || x === ''));
    console.log(object);
  }

}
