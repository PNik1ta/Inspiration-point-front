import { NgModule } from "@angular/core";
import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { CompetitionsLayoutComponent } from './competitions-layout/competitions-layout.component';
import { AsideComponent } from "../components/aside/aside.component";
import { CommonModule } from "@angular/common";
import { GeneralComponent } from './general/general.component';

@NgModule({
  imports: [
    CompetitionsRoutingModule,
    CommonModule
  ],
  declarations: [
    CompetitionsLayoutComponent,
    AsideComponent,
    GeneralComponent,
  ],
})
export class CompetitionsModule {}