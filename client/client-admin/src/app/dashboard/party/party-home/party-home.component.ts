import { Component, OnInit } from '@angular/core';
import { PartyService } from 'src/shared/services/party.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-party-home',
  templateUrl: './party-home.component.html',
  styleUrls: ['./party-home.component.scss']
})
export class PartyHomeComponent implements OnInit {

  constructor(
    private partyService: PartyService) { }

  public parties: any = [];

  public isLoading$ = new BehaviorSubject(false);

  async ngOnInit() {
    // this.parties = await this.getAllParties()
    // .finally(() => this.isLoading$.next(false))
    // this.parties = this.parties.filter(party=> party.status === 'y');
    // console.log(this.parties)
  }

  /**
   * Fetches all the products from the server
   */
  getAllParties(){
    return new Promise((resolve, reject)=>{
      this.isLoading$.next(true);
      this.partyService.getAllParties()
      .then((res)=> resolve(res['data']))
      .catch(()=> reject([]))
    })
  }  

}
