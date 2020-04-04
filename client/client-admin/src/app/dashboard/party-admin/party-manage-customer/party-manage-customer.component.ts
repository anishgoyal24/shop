import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/shared/services/party.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-party-manage-customer',
  templateUrl: './party-manage-customer.component.html',
  styleUrls: ['./party-manage-customer.component.scss']
})
export class PartyManageCustomerComponent implements OnInit {

  constructor(private partyService: PartyService,
    private utilityService: UtilityService,) { }

  party: any;

  ngOnInit() {
  }

  openModal(content, email){
    this.utilityService.openModal(content,
      {
        size: 'xl',
      })
  }

  getDetails(email){
    return new Promise((resolve, reject)=>{
      this.partyService.customerDetails(email.target.value)
      .then((res)=>{
        if(res['data']){
          this.party = res['data']
          console.log(this.party)
        }
        resolve(res)
      })
      .catch(()=>{
        reject({})
      })
    })

  }

  updateDetails(partyDetails){
  
    this.utilityService.asyncNotification('Please wait while we are updating the details...', new Promise((resolve, reject)=>{

      this.partyService.updateCustomer(partyDetails)
      .then(()=>{
        resolve(this.utilityService.resolveAsyncPromise('Details Updated Successfully!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to update the details, please try again!'))
      })
    }))


  }

}
