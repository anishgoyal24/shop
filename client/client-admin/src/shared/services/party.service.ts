import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private _http: HttpClient) { }

  /**
   * GET request to fetch all the parties from the server
   */
  getAllParties(){
    return this._http.get(environment.BASE_URL_API + '/party/list')
    .toPromise();
  }

  /**
   * POST request to create new party type
   * @param type 
   */
  createNewParty(type: string){
    
    // Party Data
    let party: {type: string, status: string} = {
      type: type,
      status: 'y'
    }

    return this._http.post(environment.BASE_URL_API + '/party/new', party)
    .toPromise();
  }

  /**
   * POST request to disable the party
   * @param partyId
   */
  deleteParty(partyId: string){
    return this._http.post(environment.BASE_URL_API + `/party/delete/${partyId}`, '')
    .toPromise();
  }

  /**
   * POST request to enable the party
   * @param partyId
   */
  enableParty(partyId: string){
    return this._http.post(environment.BASE_URL_API + `/party/enable/${partyId}`, '')
    .toPromise();
  }
  
  /**
   * POST request to create a new customer
   *
   */
  newCustomer(customerData: Object){
    return this._http.post(environment.BASE_URL_API + `/customer/new`, customerData)
    .toPromise();
  }

  /**
   * @param customerData
   */
  sendOTP(email: string){
    return this._http.post(environment.BASE_URL_API + `/customer/otp`, email)
    .toPromise();
  }

}
