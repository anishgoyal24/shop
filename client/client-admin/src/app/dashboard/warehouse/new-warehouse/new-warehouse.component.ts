import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.scss']
})
export class NewWarehouseComponent implements OnInit {

  constructor() { }
  
  /**
   * Defining account details object for which a new account will be created
   */
  accountDetails: {partyName: string, partyEmail: string, contactPerson: string,  primaryPhone: Number, secondaryPhone: Number, address: string, city: string, state: string, country: string, pincode: number, password: string, partyType: Number} = {
    partyName: null,
    partyEmail: null,
    primaryPhone: null,
    secondaryPhone: null,
    contactPerson: null,
    address: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
    password: null,
    partyType: null
  }

  // partyHomeComponent = new PartyHomeComponent(this.partyService);

  parties:any = [];

  public isLoading$ = new BehaviorSubject(false);

  ngOnInit() {
  }

}
