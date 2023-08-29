import { NgModule } from "@angular/core";
import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { CompetitionsLayoutComponent } from './competitions-layout/competitions-layout.component';
import { CommonModule } from "@angular/common";
import { GeneralComponent } from './general/general.component';
import { AsideComponent } from "../../components/aside/aside.component";

@NgModule({
  imports: [
    CompetitionsRoutingModule,
    CommonModule
  ],
  declarations: [
    CompetitionsLayoutComponent,
    GeneralComponent,
  ]
})
export class CompetitionsModule {}