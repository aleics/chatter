import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';
import { ChatMessage } from '../../models/chat-message.interface';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.styl']
})
export class ChatMessageComponent {
  @Input() message: ChatMessage;

  public date = new Date();
}
