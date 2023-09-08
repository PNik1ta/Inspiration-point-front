import { Injectable } from "@angular/core";
import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { Store } from "@ngrx/store";
import { CompetitionResultReceivedAction } from "../reducers/competitionResult/competitionResult.action";
import { CompetitionResultService } from "./competitionResult.service";
import { BaseResponse } from "../models/base-response";
import { CurrentCompetitionReceivedAction } from "../reducers/currentCompetition/currentCompetition.action";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  jsonData: string = '';


  constructor(private store: Store, private readonly competitionResultService: CompetitionResultService) { }

  private socket: WebSocket | null = null;

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Connected');
    }
  }

  subscribeToData(): void {
    if (this.socket) {
      this.socket.onmessage = (event: MessageEvent) => {

        if (event.data !== 'END') {
          this.jsonData += event.data;
        } else {
          const data: ICompetitionResult = JSON.parse(this.jsonData);
          console.log(this.jsonData);


          this.competitionResultService.shouldAddOrUpdate(data).subscribe(() => {
            this.getAllData();
            this.updateCurrentResults();
          });
          this.jsonData = '';
        }
      }
    }
  }

  getAllData(): void {
    this.competitionResultService.findAll().subscribe({
      next: (res: BaseResponse<ICompetitionResult[]>) => {
        if (res.data) {
          this.store.dispatch(CompetitionResultReceivedAction({ data: res.data }));
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  updateCurrentResults(): void {
    const currentCompetition = localStorage.getItem('currentCompetition');

    if (currentCompetition) {
      const data: ICompetitionResult = JSON.parse(currentCompetition);
      this.competitionResultService.findById(data._id!).subscribe((res: BaseResponse<ICompetitionResult>) => {
        if (res.data) {
          this.store.dispatch(CurrentCompetitionReceivedAction({ data: res.data }));
        }
      });
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.onclose = () => {
        console.log('Disconnected');
      }
      this.socket.close;
    }

  }
}