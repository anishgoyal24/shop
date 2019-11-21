import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { AdminService } from 'src/shared/services/admin.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-new-accounts',
  templateUrl: './new-accounts.component.html',
  styleUrls: ['./new-accounts.component.scss']
})
export class NewAccountsComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private adminService: AdminService
  ) { }

  /**
   * Defining account details object for which a account will be created
   */
  accountDetails: {empName: string, empEmail: string, primaryPhone: Number, address: string, city: string, state: string, country: string, pincode: number, password: string, role: string} = {
    empName: null,
    empEmail: null,
    primaryPhone: null,
    address: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
    password: null,
    role: null
  }

  // UNSUBSCRIBE THE DATA
  private subSink = new SubSink();

  // EMPLOYEES DATA
  employees: any;

  async ngOnInit() {
    this.adminService.currentData.subscribe((res)=> this.employees = res);
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

  /**
   * This Function unsubscribes from all the active subscriptions
   */
  ngOnDestroy(): void{
    this.subSink.unsubscribe();
  }

}
