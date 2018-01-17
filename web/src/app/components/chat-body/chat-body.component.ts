import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

import { ChatService, ChatEvent, ChatEventType } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.styl']
})
export class ChatBodyComponent implements OnDestroy {

  @Output()
  public newMessage = new EventEmitter<string>();

  private subscription: Subscription;
  private isReady = false;
  public messages: string[] = [];

  constructor(
    private chatService: ChatService
  ) {
    this.subscription = this.chatService.onEvent.subscribe((chatEvent: ChatEvent) => this.handleEvent(chatEvent));
  }

  handleEvent(chatEvent: ChatEvent) {
    switch (chatEvent.type) {
      case ChatEventType.open:
        this.isReady = true;
        break;
      case ChatEventType.msg:
        const msg: string = _.get(chatEvent.event, 'data');
        if (msg) {
          this.messages.push(msg);
          this.newMessage.emit(msg);
        }
        break;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
