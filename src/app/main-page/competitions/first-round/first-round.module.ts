import { NgModule } from "@angular/core";
import { FirstRoundRoutingModule } from "./first-round-routing.module";
import { SeedingComponent } from './seeding/seeding.component';
import { FirstRoundComponent } from './first-round/first-round.component';
import { UpDownComponent } from './up-down/up-down.component';
import { FirstRoundLayoutComponent } from './first-round-layout/first-round-layout.component';
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../../components/components.module";

@NgModule({
  imports: [
    ComponentsModule,
    FirstRoundRoutingModule,
    CommonModule,
  ],
  declarations: [
    SeedingComponent,
    FirstRoundComponent,
    UpDownComponent,
    FirstRoundLayoutComponent,
  ],
})
export class FirstRoundModule { }