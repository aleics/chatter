import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../models/message.interface';

@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.styl']
})
export class ChatBodyComponent {

  @Input()
  public messages: ChatMessage[];

  constructor() {}
}
