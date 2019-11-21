import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return sessionStorage.getItem("token");
  }

  isLoggedIn(){
    if(this.getToken())
      return true
    else
      return false
  }
}
