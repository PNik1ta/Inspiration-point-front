import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LiveCompetitionComponent } from './components/live-competition/live-competition.component';
import { TimerComponent } from './components/timer/timer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../core/reducers';
import { MainPageModule } from './main-page/main-page.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { localStorageSync } from 'ngrx-store-localstorage';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LiveCompetitionComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MainPageModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [
        localStorageSync({
          keys: ['competitionResult']
        })
      ],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
