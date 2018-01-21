import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { MomentModule } from 'angular2-moment';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { AppComponent } from './app.component';
import { ChatInputComponent,
         ChatBodyComponent,
         ChatMessageComponent,
         ChatLoginDialogComponent
        } from './components';
import { ChatService } from './services';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ChatInputComponent,
    ChatBodyComponent,
    ChatMessageComponent,
    ChatLoginDialogComponent
  ],
  entryComponents: [ChatLoginDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    MalihuScrollbarModule.forRoot(),

    // routes
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ChatService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
