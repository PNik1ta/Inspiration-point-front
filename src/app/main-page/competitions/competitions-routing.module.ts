import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompetitionsLayoutComponent } from "./competitions-layout/competitions-layout.component";
import { GeneralComponent } from "./general/general.component";

const routes: Routes = [
  {
    path: 'Competitions',
    component: CompetitionsLayoutComponent,
    children: [
      {
        path: 'General',
        component: GeneralComponent
      },
      {
        path: 'FirstRound',
        loadChildren: () => import('./first-round/first-round.module').then(m => m.FirstRoundModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule {

}