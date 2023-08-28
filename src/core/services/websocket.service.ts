import { Injectable } from "@angular/core";
import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { Store } from "@ngrx/store";
import { CompetitionResultReceivedAction } from "../reducers/competitionResult/competitionResult.action";

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  constructor(private store: Store) { }

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
        const data: ICompetitionResult = JSON.parse(event.data);
        this.store.dispatch(new CompetitionResultReceivedAction({ data }));
      }
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