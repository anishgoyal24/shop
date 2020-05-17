import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  observable: Observable<any>;
  socket: any;

  constructor() {
   }

  onConnect(){
    this.socket = io(environment.NOTIFICATIONS_API)
    return this.observable = new Observable((observer) => 
      this.socket.on('connected', (data) => observer.next(data))
    );
  }

  onOrderPlace(pincode: string){
    this.socket.emit('orderPlace', {pincode});
  }


}
