import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { resolve } from 'url';
import { AdminService } from 'src/shared/services/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  

  constructor(
    private utilityService: UtilityService,
    private adminService: AdminService
  ) { }

  object : {email: string, oldPassword: string, newPassword: string} = {
    email: null,
    oldPassword: null,
    newPassword: null
  }

  ngOnInit() {
  }

  changePassword(object: Object){
    this.utilityService.asyncNotification('Changing your password...', 
      new Promise((resolve, reject)=>{
        console.log(object);
        this.adminService.changePassword(object)
        .then((res)=>{
          resolve(this.utilityService.resolveAsyncPromise('Password Changed!'));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise('Oops, an error occured, please try again!'))
        })
      })
    )
  }

}
