import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardAuthService implements CanActivate {
  constructor(private auth: GuardAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    //
    if (
      JSON.parse(localStorage.getItem('user'))?.data.role_name ===
        'depot_surveyor' &&
      route.url[0].path === 'survayer-dashboard'
    ) {
      return true;
    } else if (
      JSON.parse(localStorage.getItem('user')).data.role_name ===
        'depot_manager' &&
      route.url[0].path === 'depotsuser-dashboard'
    ) {
      return true;
    }
    this.router.navigateByUrl('/home');
  }
}
