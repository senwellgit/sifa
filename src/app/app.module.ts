import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SurveyorDashboardComponent } from './surveyor-dashboard/surveyor-dashboard.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SdrStepperComponent } from './sdr-stepper/sdr-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InterceptorService } from 'src/service/interceptor.service';
import { HTTP } from '@ionic-native/http/ngx';
import { NumberPipePipe } from './number-pipe.pipe';
import { SstqrStepperComponent } from './sstqr-stepper/sstqr-stepper.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyorDashboardComponent,
    SdrStepperComponent,
    SstqrStepperComponent,
    NumberPipePipe,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatStepperModule,
    MatChipsModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  providers: [
    NumberPipePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    HTTP,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
