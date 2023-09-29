import { NgModule } from "@angular/core";
import { DirectEliminationRoutingModule } from "./direct-elimination-routing.module";
import { CommonModule } from "@angular/common";
import { SeedingComponent } from './seeding/seeding.component';
import { FirstColsComponent } from './first-cols/first-cols.component';
import { SecondColsComponent } from './second-cols/second-cols.component';
import { ComponentsModule } from "../../components/components.module";
import { FightCardComponent } from './fight-card/fight-card.component';
import { TippyDirective } from "@ngneat/helipopper";
import { DeResultsComponent } from './de-results/de-results.component';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    DirectEliminationRoutingModule,
    TippyDirective
  ],
  declarations: [
    SeedingComponent,
    FirstColsComponent,
    SecondColsComponent,
    FightCardComponent,
    DeResultsComponent
  ]
})
export class DirectEliminationModule { }