import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneralComponent } from "./competitions/general/general.component";
import { MainPageComponent } from "./main-page.component";

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
        component: GeneralComponent
      },
      {
        path: 'FirstRound',
        loadChildren: () => import('./competitions/first-round/first-round.module').then(m => m.FirstRoundModule),
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {

}