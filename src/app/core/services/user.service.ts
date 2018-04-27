import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()

export class UserService{

    constructor(private http:HttpClient){}

    //get all users
    getAllUsers():Observable<any>{
        return this.http.get('http://localhost:8080/api/users',{observe:'response'});
    }

    // get loggedIn user email
    getUserEmail(){
        const token = localStorage.getItem('authUser');
        //setting Authorization header with token
        let headers = new HttpHeaders().append('Authorization',token);
        // >-> send request on server for token verification
        return this.http
                    .get(`http://localhost:8080/api/users/email`,{headers:headers,observe:'response'});
    }

    //Activate user account if token
    // is valid or not expired
    activateAccount(token):Observable<any>{
        return this.http.put(`http://localhost:8080/api/account/activate/${token}`,{},{
            observe:'response'
        });
    }

    //Send new password reset token to user
    //if email is valid with the domain in header
    sendResetToken(email):Observable<any>{
        let headers = new HttpHeaders().append('site_url','localhost:4200');
        return this.http.put(`http://localhost:8080/api/account/forgot/${email}`,{},{
            headers:headers,
            observe:'response'
        });
    }

    //Send token to server and validate it.
    //If the token is valid we will get {access:true}
    //else {access:false}
    accessReset(token):Observable<any>{
        return this.http.get(`http://localhost:8080/api/account/reset/${token}`);
    }

    //Send reset password form data and token to server and validate it.
    //If the token is valid we will going to update user password
    //and will set user account status to 1
    resetPassword(data,token):Observable<any>{
        return this.http.put(`http://localhost:8080/api/account/reset/${token}`,data,{observe:'response'});
    }

    // delete user by it's id
    deleteUser(id){
        const token = localStorage.getItem('authUser');
        //setting Authorization header with token
        let headers = new HttpHeaders().append('Authorization',token);
        return this.http.delete(`http://localhost:8080/api/users/${id}/delete`,{
            headers:headers,
            observe:'response'
        });
    }

}