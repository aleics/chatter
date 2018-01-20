import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';
import { ChatMessage } from '../../models/chat-message.interface';

@Component({
  selector: 'chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.styl']
})
export class ChatInputComponent {
  @Input()
  public disabled = false;

  public value: string;

  constructor(
    private chatService: ChatService
  ) {}

  sendMessage() {
    const message: ChatMessage = {
      text: this.value
    };

    this.chatService.send(message);
    this.value = '';
  }
}
