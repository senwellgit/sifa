import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-depotsuser-dashboard',
  templateUrl: './depotsuser-dashboard.component.html',
  styleUrls: ['./depotsuser-dashboard.component.scss'],
})
export class DepotsuserDashboardComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}
  loggedUser$ = this.apiService.loggedInUserData$.pipe(
    map((res) => {
      if (!res) {
        return '';
      }
      res = JSON.parse(res);
      return res;
    })
  );
 
 
  // dsr() {
  //   this.router.navigateByUrl('sdr');
  // }

  // sstqr() {
  //   this.router.navigateByUrl('sstqr');
  // }
  tlwb(){
    this.router.navigateByUrl('truckload');
  }
  // tds(){
  //   this.router.navigateByUrl('truckdischarge');
  // }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
