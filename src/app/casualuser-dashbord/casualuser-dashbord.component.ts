import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-casualuser-dashbord',
  templateUrl: './casualuser-dashbord.component.html',
  styleUrls: ['./casualuser-dashbord.component.scss'],
})
export class CasualuserDashbordComponent implements OnInit {
  loggedUser$ = this.apiService.loggedInUserData$.pipe(
    map((res) => {
      if (!res) {
        return '';
      }
      res = JSON.parse(res);
      return res;
    })
  );
  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit() {}
  // dsr() {
  //   this.router.navigateByUrl('sdr');
  // }

  // sstqr() {
  //   this.router.navigateByUrl('sstqr');
  // }
  tlwb(){
    this.router.navigateByUrl('truckload');
  }
  tds(){
    this.router.navigateByUrl('truckdischarge');
  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

}
