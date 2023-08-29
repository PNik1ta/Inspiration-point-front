import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainPageComponent } from "./main-page.component";
import { GeneralTableComponent } from "./competitions/general-table/general-table.component";
import { RefereesComponent } from "./referees/referees.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        redirectTo: '/General',
        pathMatch: 'full'
      },
      {
        path: 'General',
        component: GeneralTableComponent
      },
      {
        path: 'FirstRound',
        loadChildren: () => import('./competitions/first-round/first-round.module').then(m => m.FirstRoundModule),
      },
      {
        path: 'Referees',
        component: RefereesComponent
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {

}