import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeedingComponent } from "./seeding/seeding.component";
import { FirstRoundComponent } from "./first-round/first-round.component";
import { UpDownComponent } from "./up-down/up-down.component";
import { FirstRoundLayoutComponent } from "./first-round-layout/first-round-layout.component";

const routes: Routes = [
  {
    path: '',
    component: FirstRoundLayoutComponent,
    children: [
      {
        path: 'Seeding',
        component: SeedingComponent,
      },
      {
        path: 'FirstRound',
        component: FirstRoundComponent
      },
      {
        path: 'UpDown',
        component: UpDownComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstRoundRoutingModule {

}