import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient
  ) { }

  getCountries(){
    return this.http.get(environment.BASE_URL_API + '/common/country').toPromise();
  }

  getStates(country: string){
    var params = new HttpParams().set("country", country);
    return this.http.get(environment.BASE_URL_API + '/common/states', {
      params: params
    }).toPromise();
  }
}
