import { Component, Input } from '@angular/core';
import { ChatService } from '../../services';

@Component({
  selector: 'chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.styl']
})
export class ChatMessageComponent {
  @Input() message: string;

  public date = new Date();
}
