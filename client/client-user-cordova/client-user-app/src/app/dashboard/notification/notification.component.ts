import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/shared/services/socket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private socketService: SocketService
  ) { }

  observable: Observable<any>;

  notifications = [];
  

  ngOnInit() {
    const userId = sessionStorage.getItem("partyId");
    this.socketService.socket.emit('getNotificationsById', {userId});
    this.observable = new Observable((observer)=>{
      this.socketService.socket.on('notificationsFeed', (feed)=>{
        this.notifications = feed;
      })
    })
  }

}
