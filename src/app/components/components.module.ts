import { NgModule } from "@angular/core";
import { AsideComponent } from "./aside/aside.component";
import { HeaderComponent } from "./header/header.component";
import { LiveCompetitionComponent } from "./live-competition/live-competition.component";
import { TableDesktopComponent } from "./table-desktop/table-desktop.component";
import { TableMobileComponent } from "./table-mobile/table-mobile.component";
import { TableSeedingComponent } from "./table-seeding/table-seeding.component";
import { TableUpDownComponent } from "./table-up-down/table-up-down.component";
import { TimerComponent } from "./timer/timer.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    AsideComponent,
    LiveCompetitionComponent,
    TableDesktopComponent,
    TableMobileComponent,
    TableSeedingComponent,
    TableUpDownComponent,
    TimerComponent,
    HeaderComponent,
  ],
  exports: [
    AsideComponent,
    LiveCompetitionComponent,
    TableDesktopComponent,
    TableMobileComponent,
    TableSeedingComponent,
    TableUpDownComponent,
    TimerComponent,
    HeaderComponent
  ]
})
export class ComponentsModule {

}