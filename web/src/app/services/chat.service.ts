import { Injectable, EventEmitter } from '@angular/core';
import { ChatEvent, ChatEventType, GlobalMessage, ChatDataMessage, ChatMessage, MessageType, ConfigMessage } from '../models';
import * as _ from 'lodash';
@Injectable()
export class ChatService {

  public onEvent = new EventEmitter<ChatEvent>();
  public onOpen = new EventEmitter<void>();
  public onChatMessage = new EventEmitter<ChatMessage>();
  public onConfigMessage = new EventEmitter<ConfigMessage>();

  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket('ws://localhost:1234/chat');

    this.socket.onopen = this.handleOnOpen.bind(this);

    this.socket.onmessage = this.handleOnMessage.bind(this);

    this.socket.onclose = (event) =>  this.onEvent.emit({ event, type: ChatEventType.close });

    this.socket.onerror = (event) =>  this.onEvent.emit({ event, type: ChatEventType.error });
  }

  private handleOnOpen(event) {
    this.onOpen.emit();
    this.onEvent.emit({ event, type: ChatEventType.open });
  }

  private handleOnMessage(event) {
    const message = this.getMessage(event);
    this.onEvent.emit({ event, type: ChatEventType.msg, message });

    switch (message.type) {
      case MessageType.chat:
        this.onChatMessage.emit(message as ChatMessage);
        break;
      case MessageType.config:
        this.onConfigMessage.emit(message as ConfigMessage);
        break;
      default:
        console.warn('Message type not found');
    }
  }

  public sendMessage(message: GlobalMessage) {
    const msgText = JSON.stringify(message);
    this.socket.send(msgText);
  }

  private getMessage(event: Event): GlobalMessage {
    const data = _.get(event, 'data');
    return JSON.parse(data);
  }
}
