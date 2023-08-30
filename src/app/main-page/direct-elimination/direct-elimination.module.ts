import { NgModule } from "@angular/core";
import { DirectEliminationRoutingModule } from "./direct-elimination-routing.module";
import { CommonModule } from "@angular/common";
import { SeedingComponent } from './seeding/seeding.component';
import { FirstColsComponent } from './first-cols/first-cols.component';
import { SecondColsComponent } from './second-cols/second-cols.component';
import { ComponentsModule } from "../../components/components.module";
import { FightCardComponent } from './fight-card/fight-card.component';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    DirectEliminationRoutingModule,
  ],
  declarations: [
    SeedingComponent,
    FirstColsComponent,
    SecondColsComponent,
    FightCardComponent
  ]
})
export class DirectEliminationModule { }