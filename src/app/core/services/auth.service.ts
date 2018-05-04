import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthService {
  // loggedIn subject to notify for change
  loggedInSubject = new Subject<any>();

  // subject to notify change in route
  NavSubject = new Subject<any>();

  // storing JwtHelperService instance
  public jwtHelper;

  constructor(public http: HttpClient, public router: Router) {
    this.jwtHelper = new JwtHelperService();
  }

  /*
    >=> User Registration Request
  */

  signup(data) {
    //setting headers with for domain value
    let headers = new HttpHeaders().append('site_url', 'ecommerce-rest.herokuapp.com');
    return this.http.post('http://localhost:8080/api/users/signup', data, {
      headers: headers,
      observe: 'response',
    });
  }

  /*
    >=> User Login Request
  */

  signin(data) {
    return this.http.post('http://localhost:8080/api/users/signin', data, {
      observe: 'response',
    });
  }

  /*
    >=> Verifying user is admin or not
  */

  isAdmin() {
    const token = localStorage.getItem('authUser');
    //setting Authorization header with token
    let headers = new HttpHeaders().append('Authorization', token);
    // >-> @return false if token is not exist or expired
    if (this.jwtHelper.isTokenExpired(token) || token == null)
      return of({ isAdmin: false });

    // >-> send request on server for token verification
    return this.http
      .get(`http://localhost:8080/api/users/verify`, { headers: headers })
      .catch(err => {
        alert('Server not responding.');
        this.router.navigateByUrl('/signup');
        return of(err);
      });
  }

  /*
    >=> Check for some one is loggedIn or not
  */

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authUser');
    // >-> Check for token existence
    return this.jwtHelper.isTokenExpired(token) || token == null ? false : true;
  }
}
