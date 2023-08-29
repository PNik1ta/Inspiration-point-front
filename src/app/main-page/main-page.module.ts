import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { FightComponent } from "./fight/fight.component";
import { TourCompetitionComponent } from "./tour-competition/tour-competition.component";
import { AsideComponent } from "../components/aside/aside.component";
import { BrowserModule } from "@angular/platform-browser";
import { GeneralTableComponent } from "./competitions/general-table/general-table.component";
import { RefereesComponent } from './referees/referees.component';

@NgModule({
  imports: [
    CommonModule,
    MainPageRoutingModule,
  ],
  declarations: [
    AsideComponent,
    MainPageComponent,
    FightComponent,
    TourCompetitionComponent,
    GeneralTableComponent,
    RefereesComponent
  ],
})
export class MainPageModule {}