import { NgModule } from "@angular/core";
import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { CompetitionsLayoutComponent } from './competitions-layout/competitions-layout.component';
import { CommonModule } from "@angular/common";
import { FirstRoundModule } from "./first-round/first-round.module";

@NgModule({
  imports: [
    CompetitionsRoutingModule,
    CommonModule,
    FirstRoundModule
  ],
  declarations: [
    CompetitionsLayoutComponent,
  ]
})
export class CompetitionsModule { }