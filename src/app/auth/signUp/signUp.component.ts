import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ControlContainer,
} from '@angular/forms';

import { AuthService } from '../../core/services';

@Component({
  selector: 'app-singUp',
  templateUrl: './signUp.component.html',
})
export class SignUpComponent implements OnInit {
  // stotring signup form
  signupForm: FormGroup;

  // storing and tracking
  // error and success messages
  error: any;
  success: any;
  confirmError: boolean = false;
  disable: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // creating signup form structure
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      confirm: new FormControl(null, Validators.required),
    });
  }

  // matchPassword on each KeyUp event on "confirm"
  // password to check is password is equal.If yes
  // keep confirmError as false else as true
  public matchPassword($event) {
    let { value } = $event.target;
    let password = this.signupForm.get('password').value;
    this.confirmError = value != password ? true : false;
  }

  // send user details to server for
  // registration.If valid we will get
  // success message else erro message
  public registerUser() {
    this.disable = true;
    let data = this.signupForm.value;
    // reset error and success
    this.error = this.success = '';
    // sendign request to server
    this.authService.signup(data).subscribe(
      (data: any) => {
        let { message } = data.body;
        // set success message
        this.success = message;
        //reset form
        this.signupForm.reset();
        this.disable = false;
      },
      (error: any) => {
        let { message } = error.error;
        // set error message
        this.error = message || 'Server is not responding.';
        //reset password and confirm password input's
        this.signupForm.get('password').reset();
        this.signupForm.get('confirm').reset();
        this.disable = false;
      }
    );
  }
}
