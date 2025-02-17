import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  /**
   * POST request to add category
   * @param categoryData - It consist of JSON object "name"
   */
  addCategory(categoryData){
    return this._http.post(environment.BASE_URL_API + '/category/new', categoryData)
  }

  /**
   * GET request to fetch all the cateogies from the server
   */
  getAllCategories(){
    return this._http.get(environment.BASE_URL_API + '/category/list');
  }

  /**
   * POST request to delete the category
   * @param categoryData 
   */
  deleteCategory(categoryData){
    return this._http.post(environment.BASE_URL_API + '/category/delete', categoryData)
  }
  
  /**
   * GET reqest to search a category
   * @param categoryName 
   */
  searchCategory(categoryName){
    return this._http.get(environment.BASE_URL_API + `/category/search?cat=${categoryName}`);
  }

  /**
   * POST Request to edit the category
   * @param categoryData 
   */
  editCategory(categoryData){
    return this._http.post(environment.BASE_URL_API + '/category/edit', categoryData);
  }
  
  /**
   * POST request to add party
   * @param partyData - It consist of JSON object "name"
   */
  addParty(partyData){
    return this._http.post(environment.BASE_URL_API + '/party/new', partyData);
  }
}
