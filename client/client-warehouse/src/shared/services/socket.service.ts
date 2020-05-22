import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WarehouseService } from 'src/shared/services/warehouse.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  observable: Observable<any>;
  socket: any;

  constructor(
    private warehouseService: WarehouseService
  ) {
   }

  onConnect(){
    this.socket = io(environment.NOTIFICATIONS_API)
    return this.observable = new Observable((observer) => 
      this.socket.on('connected', (data) => {
        this.socket.emit('joinWarehouseRoom');
        observer.next(data)
      })
    )
  }

  onNewOrder(){
    return this.observable = new Observable((observer) => 
      this.socket.on('openOrder', (data) => {
        let pincodeReceived = data['pincode'];
        let warehouseId = sessionStorage.getItem("warehouseId")
        this.warehouseService.checkPincodesServicable(warehouseId, pincodeReceived).then((res)=>{
          if (res['message']=='serviceable'){
            // TODO show notification
            console.log("serviceable");
          }
        }).catch((err)=>{
          console.log(err);
        })
      })
    );
  }

  orderStatus(partyId: string, status: string, orderId: string){
    this.socket.emit('orderStatus', {
      partyId,
      status,
      orderId
    });
  }

  openOrderNotificationFeed(){
    return this.observable = new Observable((observer)=>{
      this.socket.on('getOpenOrderNotifications', (data)=>{
        return data;
      })
    });
  }


}
