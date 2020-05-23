import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/shared/services/admin.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { AccountHomeComponent } from '../account-home/account-home.component';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private utilityService: UtilityService,
    private ngxService: NgxUiLoaderService) { }

  // EMPLOYEES DATA
  employees: any

  // CREATING CLASS FOR ACCOUNT HOME COMPONENT
  private accountHomeComponent = new AccountHomeComponent(this.adminService, this.utilityService);

  // LENGTH OF CATEGORY LISY
  listLength = -1;

  // BEHAVIOUR SUBJECT FOR LOADING QUERY
  isLoadingQuery$ = new BehaviorSubject(false);

  async ngOnInit() {
    this.adminService.currentData.subscribe((res)=> this.employees = res);

    if(this.employees.length === 0){
      this.ngxService.startBackground();
      this.employees = await this.accountHomeComponent.getAllEmployess().finally(()=> this.ngxService.stopBackground());
    }
      
    
    this.listLength = this.employees.length;

  }

  /**
   * This function changes the role of an employee
   * @param employee - entire employee object
   * @param role 
   */
  async changeRole(employee: any, role: string){
    try{

      let employeeData = { email: employee.empEmail, role: role }

      this.utilityService.asyncNotification('Please wait while we are processing your request', new Promise((resolve, reject)=>{
          this.adminService.changeRole(employeeData)
          .subscribe((res)=>{
            employee.role = role;
            console.log(res);
            resolve(this.utilityService.resolveAsyncPromise(`${employee.empName}'s role has been changed to ${role}!`));
          }, (err)=>{
            console.log('Some error has occured while fetching all the employees', err);
            reject(this.utilityService.rejectAsyncPromise('Oops en error occured while changing the role for this account, please try again!'))
          })
      }))

    } catch(err){
      console.log('There\'s some unexpected error occurred, please try again later!', err);
      this.utilityService.errorNotification('There\'s some unexpected error occurred, please try again later!');
    }
  }

  /**
   * This function changes the active status of an employee
   * @param employee - entire employee object
   * @param status 
   */
  async changeStatus(employee: any, status: string){
    try{

      let employeeData = { email: employee.empEmail, status: status }

      this.utilityService.asyncNotification('Please wait while we are processing your request', new Promise((resolve, reject)=>{
          this.adminService.changeStatus(employeeData)
          .subscribe((res)=>{
            employee.status = status;
            // console.log(res);
            resolve(this.utilityService.resolveAsyncPromise('Employee has been disabled successfully!'));
          }, (err)=>{
            console.log('Some error has occured while removing this employee', err);
            reject(this.utilityService.rejectAsyncPromise('Oops en error occured while while removing this employee, please try again!'))
          })
      }))

    } catch(err){
      console.log('There\'s some unexpected error occurred, please try again later!', err);
      this.utilityService.errorNotification('There\'s some unexpected error occurred, please try again later!');
    }
  }

  search($event){
    return new Promise((resolve, reject)=>{
    this.adminService.search($event.target.value)
    .then((data)=>{
      // data['data'] = data['data'].map((object)=>{
      //   return {
      //     id: object[0],
      //     name: object[1]
      //   }
      // })
      console.log(data)
      resolve()
    })
    .catch(()=>{
      reject([])
    })
    })
  } 

}
