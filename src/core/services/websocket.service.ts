import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket: WebSocket | null = null;

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('Connected');
    }

    this.socket.onmessage = (data: any) => {
      console.log('Received data: ', data.data);
      console.log('DATA RECEIVED!!!');
    }

    this.socket.onclose = () => {
      console.log('Disconnected');
    }
  }

  disconnect(): void {
    this.socket?.close;
  }
}