import { Component, OnInit } from '@angular/core';
import { PartyHomeComponent } from '../party-home/party-home.component';
import { PartyService } from 'src/shared/services/party.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-manage-party',
  templateUrl: './manage-party.component.html',
  styleUrls: ['./manage-party.component.scss']
})
export class ManagePartyComponent implements OnInit {

  constructor(
    private partyService: PartyService,
    private utilityService: UtilityService) { }

  public partyComponent = new PartyHomeComponent(this.partyService);

  public parties: any = [];

  public isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    this.isLoading$.next(true);
    this.parties = await this.partyComponent.getAllParties()
    .finally(() => this.isLoading$.next(false))
  }

  deleteParty(partyId: string, index){
    this.utilityService.confirmNotification("Are you sure, you want to remove this party?",'', {
      timeout: 5000,
      type: 'warning',
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: () => {
          this.utilityService.asyncNotification('Please wait while we are deleting the party for you', new Promise((resolve, reject)=>{
            this.partyService.deleteParty(partyId)
            .then((res)=>{
              this.parties[index].status = 'n';
              // console.log('Category Deleted', res);
              // this.listLength = this.categoriesList.length;
              resolve(this.utilityService.resolveAsyncPromise('Party Disabled!'));
            })
            .catch(()=> reject(this.utilityService.rejectAsyncPromise("Failed to remove party, please try again!")))
          }))
        }, bold: false},
        {text: 'No', action: (toast) => { this.utilityService.removeToast(toast.id); }, bold: true},
      ]
    })
  }

  enableParty(partyId: string, index){
    this.utilityService.confirmNotification("Are you sure, you want to enable this party?",'', {
      timeout: 5000,
      type: 'warning',
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      buttons: [
        {text: 'Yes', action: () => {
          this.utilityService.asyncNotification('Please wait while we are enabling the party for you', new Promise((resolve, reject)=>{
            this.partyService.enableParty(partyId)
            .then((res)=>{
              this.parties[index].status = 'y';
              // console.log('Category Deleted', res);
              // this.listLength = this.categoriesList.length;
              resolve(this.utilityService.resolveAsyncPromise('Party Enabled!'));
            })
            .catch(()=> reject(this.utilityService.rejectAsyncPromise("Failed to enable the party, please try again!")))
          }))
        }, bold: false},
        {text: 'No', action: (toast) => { this.utilityService.removeToast(toast.id); }, bold: true},
      ]
    })
  }
}
