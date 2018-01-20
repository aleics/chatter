import { Injectable, EventEmitter } from '@angular/core';
import { ChatEvent, ChatEventType, ChatMessage } from '../models';
import * as _ from 'lodash';
@Injectable()
export class ChatService {

  public onEvent = new EventEmitter<ChatEvent>();

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:1234/chat');

    this.socket.onopen = (event) => this.onEvent.emit({ event, type: ChatEventType.open });
    this.socket.onmessage = (event) =>  this.onEvent.emit({ event, type: ChatEventType.msg, message: this.getMessage(event) });
    this.socket.onclose = (event) =>  this.onEvent.emit({ event, type: ChatEventType.close });
    this.socket.onerror = (event) =>  this.onEvent.emit({ event, type: ChatEventType.error });
  }

  public send(message: ChatMessage) {
    const msgText = JSON.stringify(message);
    this.socket.send(msgText);
  }

  private getMessage(event: Event): ChatMessage {
    const data = _.get(event, 'data');
    return JSON.parse(data);
  }
}
