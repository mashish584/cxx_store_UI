import { Component, ViewEncapsulation } from '@angular/core';
import { AdminService } from './services';


@Component({
    selector:'app-admin',
    templateUrl:'./admin.component.html',
    styleUrls : ['./admin.component.css'],
    providers: [AdminService],
    encapsulation:ViewEncapsulation.None
})

export class AdminComponent{

}