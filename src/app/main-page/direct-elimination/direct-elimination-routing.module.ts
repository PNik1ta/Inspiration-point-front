import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DirectEliminationComponent } from "./direct-elimination.component";
import { SeedingComponent } from "./seeding/seeding.component";
import { FirstColsComponent } from "./first-cols/first-cols.component";
import { SecondColsComponent } from "./second-cols/second-cols.component";

const routes: Routes = [
  {
    path: '',
    component: DirectEliminationComponent,
    children: [
      {
        path: 'Seeding',
        component: SeedingComponent
      },
      {
        path: 'FirstRound',
        component: FirstColsComponent
      },
      {
        path: 'FinalRounds',
        component: SecondColsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectEliminationRoutingModule {

}