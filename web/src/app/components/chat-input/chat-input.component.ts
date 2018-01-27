import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ChatDataMessage, Message, MessageType, ChatMessage } from '../../models/message.interface';

import * as _ from 'lodash';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.styl']
})
export class ChatInputComponent {
  @Input() public disabled = false;
  @Input() public user: string;
  @Input() public uuid: string;
  @Output() public send: EventEmitter<string> = new EventEmitter();

  value: string;

  constructor() {}

  sendMessage() {
    if (!_.isEmpty(this.value)) {
      this.send.emit(this.value);
      this.value = null; // reset value to empty
    }
  }
}
