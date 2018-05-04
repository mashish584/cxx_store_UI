import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/services';

@Injectable()
export class UnAuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  // if user is loggedIn redirect them back to homepage
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
