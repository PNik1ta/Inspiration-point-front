import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/websocket.service';
import { CompetitionService } from '../core/services/competition.service';
import { Store } from '@ngrx/store';
import { CompetitionReceivedAction } from '../core/reducers/competition/competition.action';
import { BaseResponse } from '../core/models/base-response';
import { ICompetition } from '../core/interfaces/competition.interface';
import { CurrentCompetitionReceivedAction } from '../core/reducers/currentCompetition/currentCompetition.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly websocketService: WebSocketService,
    private readonly competitionResultService: CompetitionService,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    const url = 'wss://s10303.fra1.piesocket.com/v3/1?api_key=mHrjFM2YI5aX8uyJQnPgUOBKJG2GrQ37vAb5yfJf&notify_self=1';
    this.websocketService.connect(url);
    this.websocketService.subscribeToData();
    this.competitionResultService.findAll().subscribe({
      next: (res: BaseResponse<ICompetition[]>) => {
        if (res.data) {
          this.store.dispatch(CompetitionReceivedAction({ data: res.data }));
        }
      }, error: (err) => {
        console.log(err);
      }
    });

    const currentCompetition = sessionStorage.getItem('currentCompetition');


    if (currentCompetition) {
      this.store.dispatch(CurrentCompetitionReceivedAction({ data: JSON.parse(currentCompetition) }));
    }
  }
}

