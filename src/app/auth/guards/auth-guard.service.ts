import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../../core/services/auth.service';


@Injectable()

export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService,private router:Router){}

    // if user is not loggedIn redirect them back to signIn page
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        if(!this.authService.isLoggedIn()){
            this.router.navigateByUrl('/signin');
            return false;
        }
        return true;
    }

}