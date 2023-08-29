import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainPageRoutingModule } from "./main-page-routing.module";
import { MainPageComponent } from "./main-page.component";
import { FightComponent } from "./fight/fight.component";
import { TourCompetitionComponent } from "./tour-competition/tour-competition.component";
import { AsideComponent } from "../components/aside/aside.component";

@NgModule({
  imports: [
    CommonModule,
    MainPageRoutingModule
  ],
  declarations: [
    AsideComponent,
    MainPageComponent,
    FightComponent,
    TourCompetitionComponent
  ],
})
export class MainPageModule {}