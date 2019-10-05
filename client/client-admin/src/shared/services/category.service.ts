import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    console.log(localStorage.getItem('token'))
    headers.append('Authorization', "Bearer " + JSON.parse(localStorage.getItem('token'))); 
    
  }

  /**
   * POST request to add category
   * @param categoryData - It consist of JSON object "name"
   */
  addCategory(categoryData){
    let headers = new HttpHeaders();
    headers.append('Authorization', "Bearer " + localStorage.getItem('token')); 

    return this._http.post(environment.BASE_URL_API + '/category/new', categoryData, { headers
    })
  }

  /**
   * GET request to fetch all the cateogies from the server
   */
  getAllCategories(){
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this._http.get(environment.BASE_URL_API + '/category/list', {
      responseType: 'text',
      observe: 'response',
      headers: headers
    })
  }
}
