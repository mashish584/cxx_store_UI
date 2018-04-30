import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { UserService } from '../../core/services';

@Component({
  selector: 'app-account-activate',
  templateUrl: './activate.component.html',
})
export class ActivateComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    // get the token from url params if exist
    // and call the doActivate method
    this.route.params.subscribe((params: Params) => {
      let { token } = params;
      console.log(token);
      this.doActivate(token);
    });
  }

  //send the token via a userService to server
  //and if it is valid activate user account
  //else show erorr message
  private doActivate(token) {
    this.userService.activateAccount(token).subscribe(
      (data: any) => {
        let { message } = data.body;
        //show success message
        alert(message);
        // redirect user
        this.router.navigateByUrl('');
      },
      (error: any) => {
        let { message } = error.error;
        // show error message
        alert(message || 'Server not responding.');
        // redirect user
        this.router.navigateByUrl('');
      }
    );
  }
}
