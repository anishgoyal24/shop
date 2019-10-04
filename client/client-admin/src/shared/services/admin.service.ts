import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }

  /**
   * Authenticate user and retrieve a token to store on client side
   * @param userData 
   */
  authenticate(userData: any){
    console.log(userData);
    return this._http.post(environment.BASE_URL_API + '/user/authenticate', userData, {
      responseType: 'text',
      observe: 'response'
    })
  }
}
