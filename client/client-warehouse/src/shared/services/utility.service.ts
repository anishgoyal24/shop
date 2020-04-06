import { Injectable } from '@angular/core';
import { SnotifyService, SnotifyToastConfig } from 'ng-snotify';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private snotifyService: SnotifyService,
    private modalService: NgbModal,
  ) { }

  snotifySucessConfig: SnotifyToastConfig = {
    timeout: 3000,
    type: 'success',
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true
  }

  snotifyInfoConfig: SnotifyToastConfig = {
    timeout: 3000,
    type: 'info',
    closeOnClick: true,
    pauseOnHover: true,
    showProgressBar: true
  }

  snotifyErrorConfig: SnotifyToastConfig = {
    timeout: 3000,
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
   * 
   * @param myArr 
   * @param prop 
   */
  removeDuplicates(myArr: any, prop: string) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  /**
   * This function generates a custom snotify notification for success event
   * @param text
   * @param title - optional 
   * @param config - optional
   */
  successNotification(text: string, title?: string, config?: SnotifyToastConfig) {
    return this.snotifyService.success(text, title, config);
  }

  /**
   * This function generates a custom snotify notification for warning event
   * @param text 
   * @param title - optional
   * @param config - optional
   */
  warningNotification(text: string, title?: string, config?: SnotifyToastConfig) {
    return this.snotifyService.warning(text, title, config);
  }

  /**
   * This function generates a custom snotify notification for error event
   * @param text 
   * @param title - optional
   * @param config - optional
   */
  errorNotification(text: string, title?: string, config?: SnotifyToastConfig) {
    return this.snotifyService.error(text, title, config);
  }

  /**
   * This function generates a custom snotify notification for asynchronous event
   * @param text 
   * @param promise - which resolves() or rejects() on the basis of response
   * @param config - optional
   */
  asyncNotification(text: string, promise: Promise<any>, config?: SnotifyToastConfig) {
    return this.snotifyService.async(text, promise, config);
  }

  /**
   * This function generates a custom snotify notification for info event
   * @param text 
   * @param title - optional
   * @param config - optional 
   */
  infoNotfication(text: string, title?: string, config?: SnotifyToastConfig) {
    return this.snotifyService.info(text, title, config);
  }

  /**
   * This function generates a custom snotify notification for confirm event
   * @param text 
   * @param title - optional
   * @param config - optional
   */
  confirmNotification(text: string, title?: string, config?: SnotifyToastConfig) {
    return this.snotifyService.confirm(text, title, config);
  }

  /**
   * This function removes the toast notification
   * @param toastId 
   */
  removeToast(toastId: number) {
    return this.snotifyService.remove(toastId);
  }

  /**
   * This function will be called when @function asyncNotification resolves the promise
   * @param text 
   */
  resolveAsyncPromise(text: string) {
    return {
      body: text,
      config: this.snotifySucessConfig
    }
  }

  /**
   * This function will be called when @function asyncNotification resolves the promise
   * @param text 
   */
  resolveInfoAsyncPromise(text: string) {
    return {
      body: text,
      config: this.snotifyInfoConfig
    }
  }

  /**
   * This function will be called when @function asyncNotification rejects the promise
   * @param text 
   */
  rejectAsyncPromise(text: string) {
    return {
      body: text,
      config: this.snotifyErrorConfig
    }
  }

  /**
   * This function clears all the snotify toasts present in the DOM
   */
  clearAllNotifications() {
    return this.snotifyService.clear();
  }

  /**
 * This function opens up the bootstrap modal from the library
 * @param content - content to be displayed in the modal
 * @param config - config of the modal which you want to pass
 */
  openModal(content, config?) {
    return this.modalService.open(content, config);
  }

  /**
   * This function removes/dismiss all the modals that are opened
   */
  async closeAllModals() {
    return this.modalService.dismissAll();
  }

  /**
   * This function is resposible for showing a confirm dialog, with a function attached to the "Confirm"-button
   * and by passing a parameter, we can execute something else for "Cancel
   */
  public getConfirmDialogAlert() {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!'
    })
  }

  /**
   * This function return the SWAL modal
   * @param title 
   * @param text 
   * @param icon 
   */
  public getSwalFire(title?: string, text?: string, icon?: SweetAlertIcon) {
    return Swal.fire(title, text, icon);
  }

  /**
   * This function is responsible for showing the swal toast
   * @param icon - 'success', 'error', 'warning', 'info', 'question'
   */
  public getSwalToast(icon: SweetAlertIcon, title: string, text: string) {
    let Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    return Toast.fire({
      icon: icon,
      title: title,
      text: text
    })
  }

}
