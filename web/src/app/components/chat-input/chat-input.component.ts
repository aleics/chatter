import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';
import { ChatMessage } from '../../models/chat-message.interface';

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
      const message: ChatMessage = {
        text: this.value,
        user: this.user
      };

      this.chatService.send(message);
      this.value = '';
    }
  }
}
