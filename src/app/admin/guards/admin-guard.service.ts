import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from '../../core/services';


@Injectable()

export class AdminGuard implements CanActivate{

    constructor(private authService:AuthService,private router:Router){}

    //not allowing user to access this page is he is not admin
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
        return this.authService.isAdmin().map((response:{isAdmin:boolean})=> {
            if (!response.isAdmin) this.router.navigateByUrl('');
            return !!response.isAdmin;
        }).take(1);
    }

}