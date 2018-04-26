import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import "rxjs/add/operator/do";

@Injectable()

export class ProductService{

    // Storing parent category with childs
    //and seperate child category
    categories:Category[]
    c_categories:Category[];

    // subject updates notifications for parent
    // and child category updates
    p_categoryUpdate = new Subject<Category>();
    c_categoryUpdate = new Subject<Category>();
    sub_menuUpdate = new Subject<any>();

    constructor(private http:HttpClient){}

    // get all products
    getProducts(){
        return this.http.get<any>('http://localhost:8080/api/products',{observe:'response'});
    }

    // get single product
    getProduct(id){
        return this.http.get<any>(`http://localhost:8080/api/products/${id}`,{observe:'response'});
    }

    // get random products
    getRandomProducts(){
        return this.http.get<any>(`http://localhost:8080/api/products/12/random`,{observe:'response'});
    }

    // get products based on Child Category
    getProductsBySubCategory(name){
        return this.http.get<any>(`http://localhost:8080/api/products/category/child/${name}`,{observe:'response'});
    }

     // get products based on Parent Category
     getProductsByParentCategory(name){
        return this.http.get<any>(`http://localhost:8080/api/products/category/parent/${name}`,{observe:'response'});
    }

    // get all product categories
    getProductCategories(){
        return this.http.get<any>('http://localhost:8080/api/products/categories/all',{observe:'response'});
    }

    // store product in db
    storeProduct(data){
        return this.http.post<any>('http://localhost:8080/api/products/add',data,{observe:'response'});
    }

    // update product by id
    updateProduct(data,id){
        return this.http.put<any>(`http://localhost:8080/api/products/${id}`,data,{
           observe:'response',
        });
    }

    // update product Image by id
    updateProductImage(data,id){
        const req =  new HttpRequest('PUT',`http://localhost:8080/api/products/image/${id}`,data,{
           reportProgress:true});
        return this.http.request(req);
    }

    // add product category
    storeProductCategory(data,parent=false){
        return this.http.post<any>('http://localhost:8080/api/products/category/add',data,{observe:'response'})
                   .do(data => {
                       let {category} = data.body;
                       //creating a new update notification for all components
                       //based on the type of data being stored
                       parent ? this.p_categoryUpdate.next(category) : this.c_categoryUpdate.next(category);
                   });
    }

    // remove proudct by id
    removeProduct(id){
        return this.http.delete<any>(`http://localhost:8080/api/products/${id}`,{observe:'response'});
    }

}