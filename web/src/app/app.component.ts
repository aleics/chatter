import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MalihuScrollbarService, CustomScrollbarOptions } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('chatContainer') private chatContainer: ElementRef;

  public scrollbarOptions: CustomScrollbarOptions = {
    theme: 'minimal',
    scrollInertia: 200,
    alwaysShowScrollbar: 1
  };

  constructor(
    private mScrollbarService: MalihuScrollbarService
  ) {}

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.mScrollbarService.scrollTo(this.chatContainer.nativeElement, 'last');
  }
}
