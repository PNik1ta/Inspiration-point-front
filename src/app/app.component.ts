import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../core/services/websocket.service';
import { CompetitionResultService } from '../core/services/competitionResult.service';
import { Store } from '@ngrx/store';
import { CompetitionResultReceivedAction } from '../core/reducers/competitionResult/competitionResult.action';
import { BaseResponse } from '../core/models/base-response';
import { ICompetitionResult } from '../core/interfaces/competition-result.interface';
import { CurrentCompetitionReceivedAction } from '../core/reducers/currentCompetition/currentCompetition.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly websocketService: WebSocketService,
    private readonly competitionResultService: CompetitionResultService,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    const url = 'wss://free.blr2.piesocket.com/v3/test_room?api_key=MKiIO0jliytG9ok2SsKqWrnEAnaCiJKNcQ3irzF9';
    this.websocketService.connect(url);
    this.websocketService.subscribeToData();
    this.competitionResultService.findAll().subscribe({
      next: (res: BaseResponse<ICompetitionResult[]>) => {
        if (res.data && res.data.length !== 0) {
          this.store.dispatch(CompetitionResultReceivedAction({ data: res.data }));
        }
      }, error: (err) => {
        console.log(err);
      }
    });

    const currentCompetition = localStorage.getItem('currentCompetition');


    if (currentCompetition) {
      this.store.dispatch(CurrentCompetitionReceivedAction({ data: JSON.parse(currentCompetition) }));
    }
  }
}

