import { NgModule } from "@angular/core";
import { CompetitionsRoutingModule } from "./competitions-routing.module";
import { CompetitionsLayoutComponent } from './competitions-layout/competitions-layout.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CompetitionsRoutingModule,
    CommonModule,
  ],
  declarations: [
    CompetitionsLayoutComponent,
  ]
})
export class CompetitionsModule { }