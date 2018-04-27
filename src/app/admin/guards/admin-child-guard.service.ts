import { Injectable } from '@angular/core';
import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

import { AuthService } from '../../core/services';


@Injectable()

export class AdminChildGuard implements CanActivateChild{

    constructor(private authService:AuthService,private router:Router){}

    //not allowing user to access this child pages is he is not admin
    canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean{
        return this.authService.isAdmin()
                    .map((response:{isAdmin:boolean})=> {
                        if (!response.isAdmin) this.router.navigateByUrl('');
                        return !!response.isAdmin;
                    }).take(1);
    }


}