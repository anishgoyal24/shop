import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { UserService } from 'src/shared/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
  ) { }

  object : {email: string, oldPassword: string, newPassword: string} = {
    email: null,
    oldPassword: null,
    newPassword: null
  }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    this.object.email = sessionStorage.getItem("partyEmail");
  }

  changePassword(object: Object){
    this.utilityService.asyncNotification('Changing your password...', 
      new Promise((resolve, reject)=>{
        this.userService.changePassword(object)
        .then((res)=>{
          resolve(this.utilityService.resolveAsyncPromise('Password Changed!'));
        }).catch((err)=>{
          reject(this.utilityService.rejectAsyncPromise('Oops, an error occured, please try again!'))
        })
      })
    )
  }

}
