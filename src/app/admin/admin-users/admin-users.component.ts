import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  providers: [AdminService],
})
export class AdminUsersComponent implements OnInit {
  private users;

  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        let { users } = data.body;
        this.users = users;
      },
      (error: any) => alert('Something went wrong')
    );
  }

  private deleteUser(id) {
    this.userService.deleteUser(id).subscribe(
      (data: any) => {
        let { message } = data.body;
        this.users = this.users.filter(user => user._id != id);

        alert(message);

        // send notification to update counts
        this.adminService.updateCounts.next();
      },
      (error: any) => {
        console.log(error);
        let { message } = error.error;
        alert(message || 'Something went wrong');
      }
    );
  }
}
