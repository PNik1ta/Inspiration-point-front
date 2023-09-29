import { Injectable } from "@angular/core";
import { ICompetition } from "../interfaces/competition.interface";
import { Store } from "@ngrx/store";
import { CompetitionReceivedAction } from "../reducers/competition/competition.action";
import { CompetitionService } from "./competition.service";
import { BaseResponse } from "../models/base-response";
import { CurrentCompetitionReceivedAction } from "../reducers/currentCompetition/currentCompetition.action";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  jsonData: string = '';


  constructor(private store: Store, private readonly competitionResultService: CompetitionService) { }

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
          const data: ICompetition = JSON.parse(this.jsonData);
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
      next: (res: BaseResponse<ICompetition[]>) => {
        if (res.data) {
          this.store.dispatch(CompetitionReceivedAction({ data: res.data }));
        }
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  updateCurrentResults(): void {
    const currentCompetition = sessionStorage.getItem('currentCompetition');


    if (currentCompetition) {
      const data: ICompetition = JSON.parse(currentCompetition);
      this.competitionResultService.findById(data._id!).subscribe((res: BaseResponse<ICompetition>) => {
        if (res.data) {
          sessionStorage.setItem('currentCompetition', JSON.stringify(res.data));
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







