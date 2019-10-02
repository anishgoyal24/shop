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
     let headers = new HttpHeaders({ 
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    //  headers.append("Content-Type", "application/json");

    //  const httpOptions = {
    //   headers: new HttpHeaders({ 
    //     'Access-Control-Allow-Origin':'*',
    //     'Authorization':'authkey',
    //   }),
    //   observe: 'response'
    // };
    
    return this._http.post<any>(environment.BASE_URL_API + '/user/authenticate', userData, 
    {observe: 'response', 
      // headers : headers
  });
  }
}
