import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../core/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { localStorageSync } from 'ngrx-store-localstorage';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { MainPageModule } from './main-page/main-page.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [
        localStorageSync({
          keys: ['competitionResults']
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
    }),
    MainPageModule,
    RouterModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }