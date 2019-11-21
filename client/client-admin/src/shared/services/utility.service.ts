import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyToastConfig } from 'ng-snotify';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private snotifyService: SnotifyService
    ) { }

  snotifySucessConfig: SnotifyToastConfig = {
    timeout: 2000,
    type: 'success',
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true
  }

  snotifyErrorConfig: SnotifyToastConfig = {
    timeout: 2000,
    type: 'error',
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true
  }
  /**
   * This function checks whether the input string is a vaild email or not
   * @param email 
   */
  validateEmail(email: String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * This function generates a custom snotify notification for success event
   * @param text
   * @param title - optional 
   */
  successNotification(text: string, title?: string){
    return this.snotifyService.success(text, title);
  }

  /**
   * This function generates a custom snotify notification for warning event
   * @param text 
   * @param title - optional
   */
  warningNotification(text: string, title?: string){
    return this.snotifyService.warning(text, title);
  }

  /**
   * This function generates a custom snotify notification for error event
   * @param text 
   * @param title - optional
   */
  errorNotification(text: string, title?: string){
    return this.snotifyService.error(text, title);
  }

  /**
   * This function generates a custom snotify notification for asynchronous event
   * @param text 
   * @param promise - which resolves() or rejects() on the basis of response
   */
  asyncNotification(text: string, promise){
    return this.snotifyService.async(text, promise);
  }

  /**
   * This function will be called when @function asyncNotification resolves the promise
   * @param text 
   */
  resolveAsyncPromise(text: string){
    return {
      body: text,
      config: this.snotifySucessConfig
    }
  }

  /**
   * This function will be called when @function asyncNotification rejects the promise
   * @param text 
   */
  rejectAsyncPromise(text: string){
    return {
      body: text,
      config: this.snotifyErrorConfig
    }
  }

  /**
   * This function clears all the snotify toasts present in the DOM
   */
  clearAllNotifications(){
    return this.snotifyService.clear();
  }

}
