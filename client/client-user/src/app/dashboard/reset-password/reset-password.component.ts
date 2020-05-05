import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

 

  constructor(
    private utilityService: UtilityService,
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

  }

}
