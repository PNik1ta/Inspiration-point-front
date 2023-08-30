import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { FightComponent } from "./fight/fight.component";
import { TourCompetitionComponent } from "./tour-competition/tour-competition.component";
import { AsideComponent } from "../components/aside/aside.component";
import { GeneralTableComponent } from "./competitions/general-table/general-table.component";
import { RefereesComponent } from './referees/referees.component';
import { StarterComponent } from './starter/starter.component';
import { DirectEliminationComponent } from './direct-elimination/direct-elimination.component';
import { ComponentsModule } from "../components/components.module";
import { DirectEliminationModule } from "./direct-elimination/direct-elimination.module";
import { CompetitionsModule } from "./competitions/competitions.module";


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    MainPageRoutingModule,
    DirectEliminationModule,
    CompetitionsModule
  ],
  declarations: [
    MainPageComponent,
    FightComponent,
    TourCompetitionComponent,
    GeneralTableComponent,
    RefereesComponent,
    StarterComponent,
    DirectEliminationComponent,
  ],
})
export class MainPageModule { }