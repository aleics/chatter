import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.styl']
})
export class ChatBodyComponent {

  @Input()
  public messages: string[];

  constructor() {}
}
