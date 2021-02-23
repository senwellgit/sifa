import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor, SplashScreen } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { ApiService } from 'src/service/api.service';
import {GuardAuthService} from'../service/guard-auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private apiService: ApiService, private router: Router) {
    // Native StatusBar available
    if (Capacitor.getPlatform() === 'android') {
      ApiService.isCordova = true;
    }

    this.initializeApp();
  }

  initializeApp() {
    setTimeout(() => {
      SplashScreen.hide();
      let userdata=JSON.parse(localStorage.getItem('user')).data.role_name;
console.log(userdata);
      if (localStorage.getItem('user')) {
        debugger;
        ApiService.Token = JSON.parse(localStorage.getItem('user')).data.token;
        this.apiService.getDepotAndTank();
        this.apiService.loggedInUserData$.next(localStorage.getItem('user'));
        if (userdata=="depot_manager") {
          this.router.navigateByUrl('depotsuser-dashboard');
        }
        if (userdata=="depot_surveyor") {
          this.router.navigateByUrl('survayer-dashboard');
        }
      }
    }, 1000);
  }
}
