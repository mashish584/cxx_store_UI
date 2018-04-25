import { UserService } from './../../core/services/user.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';


@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styles : [
        `input.ng-dirty.ng-invalid {
            border-color:#f2f2f2;
        }`
    ],
})

export class ForgotComponent{

    // storing and tracking error
    // and success messages
    private error:any;
    private success:any;

    // binding email property with email input
    private email:String = "";

    constructor(private userService:UserService){}

    // sending resettoken to user if emai exist
    // via a call to server with userService
    private submit(){
        this.userService.sendResetToken(this.email)
            .subscribe(
                (data:any) => {
                    let {message} = data.body;
                    //setting error back to ""
                    this.error = "";
                    // update success message
                    this.success = message;
                    this.email = "";
                },
                (error:any) => {
                    let {message} = error.error;
                    //setting success back to ""
                    this.success = "";
                    // update error message
                    this.error = message || "Server is not responding";
                    this.email = "";
                }
            )
    }

}