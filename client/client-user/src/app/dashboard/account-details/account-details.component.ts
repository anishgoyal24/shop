import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  partyDetails: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    const email = sessionStorage.getItem("partyEmail");
    this.getAccountDetails(email);
  }

  getAccountDetails(email: string){
    new Promise((resolve, reject)=>{
      this.userService.getDetails(email).then((res)=>{
        if (res['message']=='success') this.partyDetails = res['data'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    }).catch((err)=>{
      console.log(err);
    })
  }

}
