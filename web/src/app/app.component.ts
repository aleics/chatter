import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MalihuScrollbarService, CustomScrollbarOptions } from 'ngx-malihu-scrollbar';
import { ChatService } from './services';
import { Subscription } from 'rxjs/Subscription';
import { ChatEvent, ChatEventType } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  public scrollbarOptions: CustomScrollbarOptions = {
    theme: 'minimal',
    scrollInertia: 200,
    alwaysShowScrollbar: 1
  };

  public chatReady = false;
  public messages: string[] = [];

  private subscription: Subscription;

  constructor(
    private mScrollbarService: MalihuScrollbarService,
    chatService: ChatService
  ) {
    this.subscription = chatService.onEvent
      .subscribe((chatEvent: ChatEvent) => this.handleEvent(chatEvent));
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleEvent(chatEvent: ChatEvent) {
    switch (chatEvent.type) {
      case ChatEventType.open:
        this.chatReady = true;
        break;
      case ChatEventType.msg:
        if (chatEvent.message) {
          this.messages.push(chatEvent.message);

          // scroll to the bottom when receiving a new message
          this.scrollToBottom();
        }
        break;
    }
  }

  scrollToBottom() {
    this.mScrollbarService.scrollTo(this.chatContainer.nativeElement, 'last');
  }
}
