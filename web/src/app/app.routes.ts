import { AppComponent } from './app.component';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '**', redirectTo: '/' }
];
