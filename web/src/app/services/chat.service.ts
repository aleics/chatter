import { Injectable, EventEmitter } from '@angular/core';

export type ChatEventType = 'OPEN' | 'MSG' | 'CLOSE' | 'ERROR';
export const ChatEventType = {
  open: 'OPEN' as ChatEventType,
  msg: 'MSG' as ChatEventType,
  close: 'CLOSE' as ChatEventType,
  error: 'ERROR' as ChatEventType
};

export interface ChatEvent {
  event: Event;
  type: ChatEventType;
}

@Injectable()
export class ChatService {

  public onEvent = new EventEmitter<ChatEvent>();

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:1234/chat');

    this.socket.onopen = (event) => this.onEvent.emit({ event, type: ChatEventType.open });
    this.socket.onmessage = (event) =>  this.onEvent.emit({ event, type: ChatEventType.msg });
    this.socket.onclose = (event) =>  this.onEvent.emit({ event, type: ChatEventType.close });
    this.socket.onerror = (event) =>  this.onEvent.emit({ event, type: ChatEventType.error });
  }

  public send(text: string) {
    this.socket.send(text);
  }
}
