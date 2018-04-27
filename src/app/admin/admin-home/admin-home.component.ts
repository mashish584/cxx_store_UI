import { OnInit, OnDestroy } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { AdminService } from '../services';

@Component({
    selector:'admin-home',
    templateUrl:'./admin-home.component.html',
})

export class AdminHome implements OnInit,OnDestroy{

    private counts:Object;

    constructor(private adminService:AdminService){}

    ngOnInit(){
        this.getAllCounts();
        this.adminService.updateCounts
            .subscribe(() => this.getAllCounts());
    }

    private getAllCounts(){
        this.adminService.getAllCounts()
        .subscribe(
            (response:any) => {
                let data = response.body;
                this.counts = data;
            },
            (error:any) => {
                alert("Something went wrong");
            }
        );
    }

    ngOnDestroy(){

    }

}