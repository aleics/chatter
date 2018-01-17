import { Injectable, EventEmitter } from '@angular/core';
import { ChatEvent, ChatEventType } from '../models';
import * as _ from 'lodash';
@Injectable()
export class ChatService {

  public onEvent = new EventEmitter<ChatEvent>();

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:1234/chat');

    this.socket.onopen = (event) => this.onEvent.emit({ event, type: ChatEventType.open });
    this.socket.onmessage = (event) =>  this.onEvent.emit({ event, type: ChatEventType.msg, message: this.getData(event) });
    this.socket.onclose = (event) =>  this.onEvent.emit({ event, type: ChatEventType.close });
    this.socket.onerror = (event) =>  this.onEvent.emit({ event, type: ChatEventType.error });
  }

  public send(text: string) {
    this.socket.send(text);
  }

  private getData(event: Event): any {
    return _.get(event, 'data');
  }
}
