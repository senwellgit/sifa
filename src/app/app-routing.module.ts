import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CasualuserDashbordComponent } from './casualuser-dashbord/casualuser-dashbord.component';
import { DepotsuserDashboardComponent } from './depotsuser-dashboard/depotsuser-dashboard.component';
import { SdrStepperComponent } from './sdr-stepper/sdr-stepper.component';
import { SstqrStepperComponent } from './sstqr-stepper/sstqr-stepper.component';
import { StationmanagerDashbordComponent } from './stationmanager-dashbord/stationmanager-dashbord.component';
import { SurveyorDashboardComponent } from './surveyor-dashboard/surveyor-dashboard.component';
import { TruckLoadComponent } from './truck-load/truck-load.component';
import { TruckdischargeComponent } from './truckdischarge/truckdischarge.component';

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
    path:'casualuser-dashboard',
    component:CasualuserDashbordComponent
  },
  {
    path:'stationmanager-dashbord',
    component:StationmanagerDashbordComponent

  },
  {
path:'truckdischarge',
component:TruckdischargeComponent
  },
  {
    path:'depotsuser-dashboard',
    component:DepotsuserDashboardComponent
  },
  {
path:'truckload',
component:TruckLoadComponent
  },
  {
    path: 'sdr',
    component: SdrStepperComponent,
  },
  {
    path: 'sstqr',
    component: SstqrStepperComponent,
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
