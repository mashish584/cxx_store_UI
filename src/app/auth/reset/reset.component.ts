import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../core/services';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
export class ResetComponent implements OnInit {
  //store reset form
  public resetForm: FormGroup;

  // storing and tracking error and
  // success messages
  public error: any;
  public confirmError: boolean = false;
  public success: any;
  public disable: boolean = false;

  //store token here
  public token: String;

  constructor(
    public userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    // creating reset form
    this.resetForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      confirm: new FormControl(null, Validators.required),
    });

    // Get token from route params and send
    // it to server via userService and if
    // token is valid allow user to reset password
    // else make a redirect
    this.route.params.subscribe((params: Params) => {
      this.token = params.token;
      this.userService
        .accessReset(this.token)
        .subscribe((data: { access: boolean }) => {
          let { access } = data;
          if (!access) return this.router.navigateByUrl('');
        });
    });
  }

  // matchPassword on each KeyUp event on "confirm"
  // password to check is password is equal.If yes
  // keep confirmError as false else as true
  public matchPassword($event) {
    let { value } = $event.target;
    let password = this.resetForm.get('password').value;
    this.confirmError = value != password ? true : false;
  }

  // change the password stored in server via userService
  // if clientSide got no error in form
  public resetPassword() {
    let { value: data } = this.resetForm;
    //reset error and success
    this.error = this.success = '';
    this.disable = true;
    this.userService.resetPassword(data, this.token).subscribe(
      (data: any) => {
        let { message } = data.body;
        // set success message
        this.success = message;
        this.disable = false;
        //reset form
        this.resetForm.reset();
        //show redirect alert
        alert('Redirecting');
        // redirect user to home after 500ms
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 500);
      },
      (error: any) => {
        let { message } = error.error;
        // ser error message
        this.error = message || 'Server not responding';
        this.disable = false;
        //reset form
        this.resetForm.reset();
      }
    );
  }
}
