import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';



@Injectable()

export class AdminService{

    constructor(private http:HttpClient){}

    updateCounts = new Subject<any>();

    getAllCounts(){
        return this.http.get('http://localhost:8080/api/account/all/counts',{
            observe:'response'
        });
    }

}