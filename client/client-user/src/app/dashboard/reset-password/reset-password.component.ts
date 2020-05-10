import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { UserService } from 'src/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

 

  constructor(
    private utilityService: UtilityService,
    private userService: UserService,
    private router: Router
  ) { }

  object : {email: string, oldPassword: string, newPassword: string} = {
    email: null,
    oldPassword: null,
    newPassword: null
  }

  ngOnInit() {
    this.object.email = sessionStorage.getItem("partyEmail");
  }

  changePassword(object: Object){
    this.utilityService.asyncNotification("Changing password please wait...", new Promise((resolve, reject)=>{
      this.userService.changePassword(object).then((res)=>{
        if (res['message']=='success'){
          resolve(this.utilityService.resolveAsyncPromise("Successfully changed password!"));
          sessionStorage.clear();
          this.router.navigate(['home']);
        }
      }).catch((err)=>{
        this.utilityService.rejectAsyncPromise("There was some error changing the password. Please try again later!");
        console.log(err);
      })
    }).catch((err)=>{
      this.utilityService.errorNotification("There was some error changing the password. Please try again later!");
      console.log(err);
    })
    )
  }

}
