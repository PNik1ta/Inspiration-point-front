import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private readonly webSocketService: WebSocketService) {}

  ngOnInit(): void {
    const url = 'wss://free.blr2.piesocket.com/v3/test_room?api_key=MKiIO0jliytG9ok2SsKqWrnEAnaCiJKNcQ3irzF9';
    this.webSocketService.connect(url);
  }
}
