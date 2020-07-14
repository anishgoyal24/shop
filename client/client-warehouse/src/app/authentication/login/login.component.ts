import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';
import { WarehouseService } from 'src/shared/services/warehouse.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private _location: Location,
    private utilityService: UtilityService,
    private warehouseService: WarehouseService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ){ }

  isLoading$ = new BehaviorSubject(false);

  backClicked() {
    this._location.back();
  }

  ngOnInit(){
    this.ngxService.start()
    setInterval(() => {
      this.ngxService.stop()
    }, 1000);
  }

  login(){
    try {
      let userData = {
        username: this.username,
        password: this.password
      };
      if (userData){
        this.isLoading$.next(true);
        this.utilityService.asyncNotification('Please wait while we are logging you in!', new Promise((resolve, reject)=>{
          this.warehouseService.authenticate(userData)
          .then((res)=>{
            if (res.headers.get('Authorization')) {
              sessionStorage.setItem("token", res.headers.get('Authorization').split(" ")[1]);
              this.getDetails(this.username).then(()=>{
                this.isLoading$.next(false);
                this.router.navigate(['/dashboard', 'overview']);
                const warehouseName = sessionStorage.getItem("warehouseName");
                resolve(this.utilityService.resolveAsyncPromise(`Welcome back ${warehouseName}` + "!"));
              }).catch((err)=>{
                sessionStorage.clear();
                reject(this.utilityService.resolveAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`));
              });
            }
            else{
              sessionStorage.clear();
              reject(this.utilityService.resolveAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`));
            }
          },)
          .catch( (err)=>{
            reject(this.utilityService.resolveAsyncPromise(`Oops some error has occured, while logging you in, please try again later!`));
          })
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  getDetails(email: string){
    return new Promise((resolve, reject)=>{
      this.warehouseService.getDetails(email).then((res: Response)=>{
        if (res['message'] == "success"){
          sessionStorage.setItem("warehouseEmail", res["data"]["warehouseEmail"]);
          sessionStorage.setItem("warehouseId", res["data"]["warehouseId"]);
          sessionStorage.setItem("primaryPhone", res["data"]["primaryPhone"]);
          sessionStorage.setItem("warehouseName", res["data"]["warehouseName"]);
          sessionStorage.setItem("type", res["data"]["type"]);
          sessionStorage.setItem("pincode", res['data']["pincode"]);
          sessionStorage.setItem("role", res['data']["role"]);
          resolve();
        }
        else{
          sessionStorage.clear();
          reject();
        }
      }).catch((err)=>{
        sessionStorage.clear();
        console.log(err);
        reject();
      })
    });
  }

  forgotPassword(){
    this.router.navigate(['forgot-password']);
  }
}
