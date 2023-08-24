import { NgModule } from "@angular/core";
import { FirstRoundRoutingModule } from "./first-round-routing.module";
import { SeedingComponent } from './seeding/seeding.component';
import { FirstRoundComponent } from './first-round/first-round.component';
import { UpDownComponent } from './up-down/up-down.component';
import { FirstRoundLayoutComponent } from './first-round-layout/first-round-layout.component';
import { TableDesktopComponent } from "../../components/table-desktop/table-desktop.component";
import { TableMobileComponent } from "../../components/table-mobile/table-mobile.component";
import { TableSeedingComponent } from "../../components/table-seeding/table-seeding.component";
import { TableUpDownComponent } from "../../components/table-up-down/table-up-down.component";

@NgModule({
  imports: [
    FirstRoundRoutingModule
  ],
  declarations: [
    SeedingComponent,
    FirstRoundComponent,
    UpDownComponent,
    FirstRoundLayoutComponent,
    TableDesktopComponent,
    TableMobileComponent,
    TableSeedingComponent,
    TableUpDownComponent
  ],
})
export class FirstRoundModule { }