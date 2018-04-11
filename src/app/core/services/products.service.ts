import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()

export class ProductService{

    constructor(private http:HttpClient){}

    storeProduct(data){
        return this.http.post<any>('http://localhost:8080/api/products/add',data);
    }

}