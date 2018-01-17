import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { MomentModule } from 'angular2-moment';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { AppComponent } from './app.component';
import { ChatInputComponent, ChatBodyComponent, ChatMessageComponent } from './components';
import { ChatService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    ChatInputComponent,
    ChatBodyComponent,
    ChatMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    MomentModule,
    MalihuScrollbarModule.forRoot()
  ],
  providers: [
    ChatService
  ],
  bootstrap: [
    AppComponent,
    ChatInputComponent
  ]
})
export class AppModule { }