import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor(public http: HttpClient) {}

  /*
         >=> Get All users details
    */
  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/users', {
      observe: 'response',
    });
  }

  /*
         >=> Get loggedIn user details
    */
  getUserDetail() {
    const token = localStorage.getItem('authUser');
    //setting Authorization header with token
    let headers = new HttpHeaders().append('Authorization', token);
    // >-> send request on server for token verification
    return this.http.get(`http://localhost:8080/api/users/details`, {
      headers: headers,
      observe: 'response',
    });
  }

  /*
         >=> Activation user account if token is valid
    */
  activateAccount(token): Observable<any> {
    return this.http.put(
      `http://localhost:8080/api/account/activate/${token}`,
      {},
      {
        observe: 'response',
      }
    );
  }

  /*
         >=> Send Token if email is valid
    */
  sendResetToken(email): Observable<any> {
    //setting headers with for domain value
    let headers = new HttpHeaders().append('site_url', 'localhost:4200');
    return this.http.put(
      `http://localhost:8080/api/account/forgot/${email}`,
      {},
      {
        headers: headers,
        observe: 'response',
      }
    );
  }

  /*
         >=> Send token to server and validate it.
         >=> If the token is valid we will get {access:true}
         >=> else {access:false}
    */
  accessReset(token): Observable<any> {
    return this.http.get(`http://localhost:8080/api/account/reset/${token}`);
  }

  /*
        >=> Send reset password form data and token to server and validate it.
        >=> If the token is valid we will going to update user password
        >=> and will set user account status to 1
    */
  resetPassword(data, token): Observable<any> {
    return this.http.put(
      `http://localhost:8080/api/account/reset/${token}`,
      data,
      { observe: 'response' }
    );
  }

  /*
        Delete user if user != current loggedIn user
    */
  deleteUser(id) {
    const token = localStorage.getItem('authUser');
    //setting Authorization header with token
    let headers = new HttpHeaders().append('Authorization', token);
    return this.http.delete(`http://localhost:8080/api/users/${id}/delete`, {
      headers: headers,
      observe: 'response',
    });
  }
}
