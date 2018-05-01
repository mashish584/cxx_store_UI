import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AdminService } from './services';


@Component({
    selector:'app-admin',
    templateUrl:'./admin.component.html',
    styleUrls : ['./admin.component.css'],
    encapsulation:ViewEncapsulation.None
})

export class AdminComponent implements OnInit{

    private user;

    constructor(private adminService:AdminService){}

    ngOnInit(){
        this.adminService.getUserDetail()
            .subscribe(
                (data:any) => {
                    let { user } = data.body;
                    this.user = user;
                },
                (error:any) => {
                    console.error(error);
                }
            );
    }

  // remove user token and updating
  // navigation subject notification
  // for navigation items
  private signOut() {
    this.adminService.logOut();
  }

}