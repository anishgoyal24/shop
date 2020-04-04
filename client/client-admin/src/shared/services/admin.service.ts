import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private _http: HttpClient;
  
  /**
   * Both of the variables listed down below are used to share the data through this common service among different components in the app
   * @constant dataSource
   * @constant currentData
   */
  private dataSource = new BehaviorSubject<any>([]);
  currentData = this.dataSource.asObservable();

  constructor(handler: HttpBackend, private httpClient: HttpClient) {
    /**
     * HTTP Backend to skip auth interception with Authorization Header
     */
    this._http = new HttpClient(handler);
   }


   public changeData(data: any){
    this.dataSource.next(data);
  }
  /**
   * Authenticate user and retrieve a token to store on client side.
   * 
   * !=== DEFAULT ADMIN CREDENTIALS ===!
   * 
   * Email - parveengoel@gmail.com
   * Password - admin
   * 
   * @param userData 
   */
  authenticate(userData: any){
    console.log(userData);
    return this._http.post(environment.BASE_URL_API + '/user/authenticate', userData, {
      responseType: 'text',
      observe: 'response'
    })
  }

  /**
   * This service function calls the HTTP POST Request to create a new account!
   * @param accountDetails 
   */
  createNewAccount(accountDetails: any){
    return this.httpClient.post(environment.BASE_URL_API + '/employee/new', accountDetails, {
      responseType: 'text',
      observe: 'response'
    })
  }

  /**
   * This service function calls the HTTP GET request to get all accounts!
   */
  getAllAccounts(){
    return this.httpClient.get<any>(environment.BASE_URL_API + '/employee/list');
  }

  /**
   * This service function calls the HTTP POST request to change the role of the current employee
   * @param employeeData 
   */
  changeRole(employeeData: Object){
    return this.httpClient.post<any>(environment.BASE_URL_API + '/employee/changerole', employeeData);
  }

  /**
   * This service function calls the HTTP POST request to disable the employee
   * @param employeeData 
   */
  changeStatus(employeeData: Object){
    return this.httpClient.post<any>(environment.BASE_URL_API + '/employee/changestatus', employeeData);
  }
  

  changePassword(object: Object){
    return this.httpClient.post(environment.BASE_URL_API + '/employee/changepassword', object).toPromise();
  }
}
