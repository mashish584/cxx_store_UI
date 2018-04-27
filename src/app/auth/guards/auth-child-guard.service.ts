import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../core/services';


@Injectable()

export class ChildAuthGuard implements CanActivateChild{

    constructor(private authService:AuthService,private router:Router){}

    // if user is not loggedIn redirect them back to signIn page
    canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        if(!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/signin');
            return false;
        }
        return true;
    }

}