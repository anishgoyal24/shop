import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.component.html',
  styleUrls: ['./new-accounts.component.scss']
})
export class NewAccountsComponent implements OnInit {

  constructor(
    private utilityService: UtilityService
  ) { }

  /**
   * Defining account details object for which a account will be created
   */
  accountDetails: {name: string, email: string, contact: Number, address: string, city: string, state: string, country: string, pincode: number} = {
    name: null,
    email: null,
    contact: null,
    address: null,
    city: null,
    state: null,
    country: null,
    pincode: null
  }

  async ngOnInit() {
  }

  /**
   * This function is resposible for creating new accounts for users
   * @param accountDetails 
   * Requires the role of an admin or the owner in order to operate
   */
  async createAccount(accountDetails: Object){
    try{
      this.utilityService.asyncNotification('Please hold on, we are processing your request...', new Promise((resolve, reject)=>{
        
      }))

    } catch(err){
      console.log('There\'s some unexpected error occurred, please try again later!', err);
      this.utilityService.errorNotification('There\'s some unexpected error occurred, please try again later!');
    }
  }

}
