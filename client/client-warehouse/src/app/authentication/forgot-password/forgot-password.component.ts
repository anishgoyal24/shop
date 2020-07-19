import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  phone: string = "";

  constructor(
    private _location: Location,
    private ngxService: NgxUiLoaderService,
    private utilityService: UtilityService,
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit() {
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

  backClicked() {
    this._location.back();
  }

  forgotPassword(){
    try {
      this.utilityService.asyncNotification("Changing password...", new Promise((resolve, reject)=>{
        this.warehouseService.forgotPassword(this.phone)
        .then((res)=>{
          if (res['message']=='success'){
            resolve(this.utilityService.resolveAsyncPromise("Successfully reset passsword! Please check your email."));
            this.backClicked();
          }
        }).catch((err)=>{
          console.log(err);
          reject(this.utilityService.rejectAsyncPromise("Some error occurred while resetting your password! Please try again later!"));
        })
      }))
    } catch (error) {
      console.log(error);
        this.utilityService.errorNotification("Some error occurred while resetting your password! Please try again later!");
    }
  }

}
