import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/websocket.service';
import { IWebsocketMessage } from '../core/interfaces/websocket.message';
import { ICompetitionResult } from '../core/interfaces/competition-result.interface';
import { Store } from '@ngrx/store';
import { getCompetitionResult } from '../core/reducers/competitionResult/websocket.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  websocketData: ICompetitionResult | null = null;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(getCompetitionResult).subscribe(data => {
      this.websocketData = data;
    })
  }
}
