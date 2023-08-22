import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompetitionsLayoutComponent } from "./competitions-layout/competitions-layout.component";

const routes: Routes = [
  {
    path: '',
    component: CompetitionsLayoutComponent,
    children: [
      {
        path: 'FirstRound',
        loadChildren: () => import('./first-round/first-round.module').then(m => m.FirstRoundModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule {

}