import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService, AuthService } from './../../core/services';

import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class AdminService {
  constructor(
    public http: HttpClient,
    public userService: UserService,
    public authService: AuthService,
    public router: Router
  ) {}

  updateCounts = new Subject<any>();

  getUserDetail() {
    return this.userService.getUserDetail();
  }

  getAllCounts() {
    return this.http.get('http://localhost:8080/api/account/all/counts', {
      observe: 'response',
    });
  }

  logOut() {
    localStorage.removeItem('authUser');
    this.authService.NavSubject.next();
    this.authService.loggedInSubject.next();
    this.router.navigateByUrl('');
  }
}
