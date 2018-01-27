import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';
import { ChatDataMessage, Message, MessageType } from '../../models/message.interface';

import * as _ from 'lodash';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.styl']
})
export class ChatInputComponent {
  @Input() public disabled = false;
  @Input() public user: string;

  public value: string;

  constructor(
    private chatService: ChatService
  ) {}

  sendMessage() {
    if (!_.isEmpty(this.value)) {
      const messageData: ChatDataMessage = {
        text: this.value,
        user: this.user
      };

      const message = new Message(MessageType.chat, messageData);

      this.chatService.sendMessage(message);
      this.value = '';
    }
  }
}
