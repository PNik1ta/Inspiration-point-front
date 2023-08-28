import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { LiveCompetitionComponent } from './components/live-competition/live-competition.component';
import { TimerComponent } from './components/timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../core/reducers';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    LiveCompetitionComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
