import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../core/services';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
})
export class SignInComponent implements OnInit {
  signinForm: FormGroup;
  error: any;
  disable: boolean = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    //creating signInform with formControls
    this.signinForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  // send email & password to server for
  // authentication if valid we will get
  // token and redirect user to homepage
  public signInUser() {
    this.disable = true;
    // reset error
    this.error = '';
    // form data
    let data = this.signinForm.value;
    // sending request to server
    this.authService.signin(data).subscribe(
      (data: any) => {
        let { token } = data.body;
        localStorage.setItem('authUser', token);
        // reset form
        this.signinForm.reset();
        this.disable = false;
        // update navigation Subject
        this.authService.NavSubject.next();
        this.authService.loggedInSubject.next();
        // Navigate User
        this.router.navigate(['']);
      },
      (error: any) => {
        let { message } = error.error;
        // set error message
        this.error = message || 'Server is not responding.';
        this.disable = false;
        // reset form
        this.signinForm.reset();
      }
    );
  }
}
