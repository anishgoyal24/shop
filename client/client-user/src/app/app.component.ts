import { Component } from '@angular/core';
import { SocketService } from 'src/shared/services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-user';

  constructor(){ 
  }


}
