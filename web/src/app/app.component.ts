import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { MalihuScrollbarService, CustomScrollbarOptions } from 'ngx-malihu-scrollbar';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

import { ChatService } from './services';
import { ChatEvent,
         ChatEventType,
         ChatMessage,
         ConfigMessage,
         Message,
         ChatDataMessage,
         MessageType } from './models';
import { ChatLoginDialogComponent } from './components';

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
  public messages: ChatMessage[] = [];
  public userName: string;
  public uuid: string;

  private connection = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private mScrollbarService: MalihuScrollbarService,
    private chatService: ChatService
  ) {

    this.subscriptions.push(
      this.chatService.onChatMessage
        .subscribe((chatMessage: ChatMessage) => this.handleMessageEvent(chatMessage))
    );

    this.subscriptions.push(this.handleLogin());
    this.subscriptions.push(
      this.chatService.onConfigMessage
        .subscribe((configMessage: ConfigMessage) => this.handleConfigEvent(configMessage))
    );
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  handleLogin() {
    const dialogConfig = {
      width: '350px',
      autoFocus: true,
      disableClose: true
    };

    const dialogRef = this.setLoginModal(dialogConfig);

    return Observable
      .combineLatest(
        this.chatService.onOpen,
        dialogRef.afterClosed()
      )
      .subscribe(([_, userName]: [undefined, string]) => {
        this.userName = userName;
        this.chatReady = true;
      });
  }

  handleMessageEvent(chatMessage: ChatMessage) {
    this.messages.push(chatMessage);
  }

  handleConfigEvent(configMessage: ConfigMessage) {
    this.uuid = configMessage.data.uuid;
  }

  scrollToBottom() {
    this.mScrollbarService.scrollTo(this.chatContainer.nativeElement, 'last');
  }

  setLoginModal(config: MatDialogConfig<any>) {
    return this.dialog.open(ChatLoginDialogComponent, config);
  }

  sendMessage(text: string) {
    const messageData: ChatDataMessage = {
      text,
      user: {
        name: this.userName,
        uuid: this.uuid
      }
    };

    this.chatService.sendMessage(
      new Message(MessageType.chat, messageData)
    );
  }
}
