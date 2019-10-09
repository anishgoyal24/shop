import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(){
    if(this.getToken())
      return true
    else
      return false
  }
}
