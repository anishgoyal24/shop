import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private warehouseService: WarehouseService
  ) { }
  
  /**
   * Defining account details object for which a new account will be created
   */
  accountDetails: {warehouseName: string, warehouseEmail: string, personOfContact: string,  primaryPhone: Number, secondaryPhone: Number, address: string, city: string, state: string, country: string, pincode: number, password: string, status: string, role: string} = {
    warehouseName: null,
    warehouseEmail: null,
    primaryPhone: null,
    secondaryPhone: null,
    personOfContact: null,
    address: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
    password: null,
    status: null,
    role: null
  }

  // partyHomeComponent = new PartyHomeComponent(this.partyService);

  parties:any = [];

  public isLoading$ = new BehaviorSubject(false);

  ngOnInit() {
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

}
