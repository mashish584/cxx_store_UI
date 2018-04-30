import { OnInit, Component } from '@angular/core';

import { UserService } from '../../core/services';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: [
    `input.ng-dirty.ng-invalid {
            border-color:#f2f2f2;
        }`,
  ],
})
export class ForgotComponent {
  // storing and tracking error
  // and success messages
  private error: any;
  private success: any;
  private disable: boolean = false;

  // binding email property with email input
  private email: String = '';

  constructor(private userService: UserService) {}

  // sending resettoken to user if emai exist
  // via a call to server with userService
  private submit() {
    this.disable = true;
    this.error = this.success = '';
    this.userService.sendResetToken(this.email).subscribe(
      (data: any) => {
        let { message } = data.body;
        // update success message
        this.success = message;
        this.disable = false;
        this.email = '';
      },
      (error: any) => {
        let { message } = error.error;
        // update error message
        this.error = message || 'Server is not responding';
        this.disable = false;
        this.email = '';
      }
    );
  }
}
