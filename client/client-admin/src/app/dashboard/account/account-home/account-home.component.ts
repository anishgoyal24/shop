import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/shared/services/admin.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService
  ) { }

  // EMPLOYEES DATA
  employees: any;

  async ngOnInit() {
    this.employees = await this.getAllEmployess();
    this.adminService.changeData(this.employees);
  }

  /**
   * This function is responsible for fetching all the employees present in the database
   */
  async getAllEmployess(){ 
    try{
      return new Promise((resolve, reject)=>{
        this.adminService.getAllAccounts()
        .subscribe((res)=>{
          resolve(res['data']);
        }, (err)=>{
          console.log('Some error has occured while fetching all the employees', err);
          this.utilityService.errorNotification('Oops, we couldn\'t fetch the accounts for you, please try again!')
          reject([]);
        })
      })

    } catch(err){
      console.log('There\'s some unexpected error occurred, please try again later!', err);
      this.utilityService.errorNotification('There\'s some unexpected error occurred, please try again later!');
    }
  }  

}
