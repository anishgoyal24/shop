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

  register(partyDetails: any){
    return this.http.post(environment.BASE_URL_API + '/customer/new', partyDetails).toPromise();
  }

  getOtp(email: string){
    return this.http.post(environment.NOTIFICATIONS_API + '/send-otp', {
      user: {
        email: email
      }
    }).toPromise();
  }

  verifyOtp(email, otp, hash){
    return this.http.post(environment.NOTIFICATIONS_API + '/verify-otp', {
      user: {
        email: email,
        hash: hash,
        otp: otp
      }
    }).toPromise();
  }

  changePassword(object: Object){
    return this.http.post(environment.BASE_URL_API + '/customer/changepassword', object).toPromise();
  }

  /**
   * Reset password
   * @param email 
   */
  forgotPassword(email: string){
    return this.http.post(environment.BASE_URL_API + '/customer/forgotpassword', email).toPromise();
  }

}
