import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SdrStepperComponent } from './sdr-stepper/sdr-stepper.component';
import { SurveyorDashboardComponent } from './surveyor-dashboard/surveyor-dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'survayer-dashboard',
    component: SurveyorDashboardComponent,
  },
  {
    path: 'sdr',
    component: SdrStepperComponent,
  },
  {
    path: 'sstqr',
    component: SdrStepperComponent,
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
