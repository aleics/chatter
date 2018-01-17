import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';

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
    this.chatService.send(this.value);
    this.value = '';
  }
}
