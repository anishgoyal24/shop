import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  /**
   * GET request to fetch all the products from the server
   */
  getAllProducts() {
    return this._http.get(environment.BASE_URL_API + '/product/management/listproducts')
      .toPromise();
  }

  /**
   * 
   * @param productDetails 
   */
  createNewProduct(productDetails: Object) {
    return this._http.post(environment.BASE_URL_API + '/product/management/add', productDetails)
      .toPromise();
  }

  /**
   * 
   * @param productDetails 
   */
  updateProduct(itemDetails: Object) {
    return this._http.post(environment.BASE_URL_API + '/product/management/update', itemDetails)
      .toPromise();
  }


  /**
   * 
   * @param itemDetails 
   */
  addPacking(itemDetails: Object) {
    return this._http.post(environment.BASE_URL_API + '/product/management/addpacking', itemDetails)
      .toPromise();
  }

  /**
   * 
   * @param itemDetails 
   */
  removePacking(itemDetails: Object) {
    return this._http.post(environment.BASE_URL_API + '/product/management/deletepacking', itemDetails)
      .toPromise();
  }


  /**
   * 
   * @param itemId 
   * @param packingId 
   */
  enablePacking(itemId: number, packingId: number) {
    return this._http.post(environment.BASE_URL_API + `/product/management/enablepacking?itemId=${itemId}&&packingId=${packingId}`, '')
      .toPromise();
  }

  /**
   * This function adds the new category to the product
   * @param itemId 
   * @param categoryId 
   */
  addNewCategory(itemId: number, categoryId: number) {
    return this._http.post(environment.BASE_URL_API + `/product/management/addcategory?itemId=${itemId}&&categoryId=${categoryId}`, '')
      .toPromise();
  }

  /**
   * This function removes the category from the product
   * @param itemId 
   * @param categoryId 
   */
  removeCategory(itemId: number, categoryId: number) {
    return this._http.post(environment.BASE_URL_API + `/product/management/removecategory?itemId=${itemId}&&categoryId=${categoryId}`, '')
      .toPromise();
  }

  /**
   * 
   * @param itemId 
   */
  disableProduct(itemId: number) {
    return this._http.post(environment.BASE_URL_API + `/product/management/delete/${itemId}`, '').toPromise()
  }

/**
 * 
 * @param itemId 
 */
  enableProduct(itemId: number) {
    return this._http.post(environment.BASE_URL_API + `/product/management/enable/${itemId}`, '').toPromise()
  }


  /**
   * Upload Image
   * @param formdata 
   */
  uploadImage(formdata: any, filename: string){
    return this._http.post(environment.UPLOADS_API+ '/upload?filename=' + filename, formdata).toPromise();
  }


  /**
   * Get Image
   * @param filename 
   */
  getImage(filename: string){
    return this._http.get(environment.UPLOADS_API + '/image', {
      params: new HttpParams().set("filename", filename)
    }).toPromise();
  }

  search(query: string){
    var params = new HttpParams().set("query", query);
    return this._http.get(environment.BASE_URL_API + '/product/management/search', {
      params: params
    }).toPromise();
  }


}
