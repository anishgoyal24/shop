import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(userData: any){
    return this.http.post(environment.BASE_URL_API + '/user/authenticate', userData, {
      responseType: 'text',
      observe: 'response'
    }).toPromise();
  }

  getDetails(username: any){
    let params = new HttpParams().set("username", username);
    return this.http.get(environment.BASE_URL_API + '/customer/getdetails', {
      params: params
    }).toPromise();
  }

  register(partyDetails: any, otp: any){
    return this.http.post(environment.BASE_URL_API + '/customer/new/' + otp, partyDetails).toPromise();
  }

  getOtp(email: string){
    return this.http.post(environment.BASE_URL_API + '/customer/otp', email).toPromise();
  }

  changePassword(object: Object){
    return this.http.post(environment.BASE_URL_API + '/customer/changepassword', object).toPromise();
  }
}
