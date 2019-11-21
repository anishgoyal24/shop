import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private _http: HttpClient;

  constructor(handler: HttpBackend) {
    /**
     * HTTP Backend to skip auth interception with Authorization Header
     */
    this._http = new HttpClient(handler);
   }

  /**
   * Authenticate user and retrieve a token to store on client side.
   * 
   * !=== DEFAULT ADMIN CREDENTIALS ===!
   * 
   * Email - parveengoel@gmail.com
   * Password - admin
   * 
   * @param userData 
   */
  authenticate(userData: any){
    console.log(userData);
    return this._http.post(environment.BASE_URL_API + '/user/authenticate', userData, {
      responseType: 'text',
      observe: 'response'
    })
  }

  /**
   * This service function calls the HTTP POST Request to create a new account!
   * @param accountDetails 
   */
  createNewAccount(accountDetails: any){
    return this._http.post(environment.BASE_URL_API + '/employee/new', accountDetails, {
      responseType: 'text',
      observe: 'response'
    })
  }
}
