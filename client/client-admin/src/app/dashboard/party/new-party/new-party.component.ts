import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { PartyService } from 'src/shared/services/party.service';

@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.scss']
})
export class NewPartyComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private partyService: PartyService) { }

  public type: string = '';

  ngOnInit() {
  }

  /**
   * This function creates the new party type
   * @param type 
   */
  async createParty(type: string){
    this.utilityService.asyncNotification('Please wait, we are creating the new party type...', 
    new Promise((resolve, reject)=>{
      this.partyService.createNewParty(type)
      .then((res)=> {
        console.log(res);
        resolve(this.utilityService.resolveAsyncPromise('New Party Created!'));
      })
      .catch(()=> reject(this.utilityService.rejectAsyncPromise('Oops, an error occured, please try again!')))
    }))
  }

}
