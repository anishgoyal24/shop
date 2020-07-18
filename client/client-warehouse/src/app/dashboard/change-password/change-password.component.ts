import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  object : {email: string, oldPassword: string, newPassword: string} = {
    email: null,
    oldPassword: null,
    newPassword: null
  }

  constructor(
    private warehouseService: WarehouseService,
    private utilityService: UtilityService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
    this.object.email = sessionStorage.getItem("warehouseEmail");
  }

  changePassword(object: Object){
    this.utilityService.asyncNotification("Changing password please wait...", new Promise((resolve, reject)=>{
      this.warehouseService.changePassword(object).then((res)=>{
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
