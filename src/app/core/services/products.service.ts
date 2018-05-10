import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";

import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/do";

@Injectable()
export class ProductService {
  // Storing parent category with childs
  //and seperate child category
  categories: Category[];
  c_categories: Category[];

  // subject updates notifications for parent
  // and child category updates
  p_categoryUpdate = new Subject<Category>();
  c_categoryUpdate = new Subject<Category>();
  sub_menuUpdate = new Subject<any>();

  constructor(public http: HttpClient) {}

  /*
      >=> UGet All Products
  */
  getProducts() {
    return this.http.get<any>("api/products", {
      observe: "response"
    });
  }

  /*
      >=> Get Single Product
  */
  getProduct(id) {
    return this.http.get<any>(`api/products/${id}`, {
      observe: "response"
    });
  }

  /*
      >=> Get Random Products
  */
  getRandomProducts(total) {
    return this.http.get<any>(`api/products/${total}/random`, {
      observe: "response"
    });
  }

  /*
        >=> Get product based on sub Category
  */
  getProductsBySubCategory(name) {
    return this.http.get<any>(`api/products/category/child/${name}`, { observe: "response" });
  }

  /*
        >=> Get product based on parent Category
  */
  getProductsByParentCategory(name) {
    return this.http.get<any>(`api/products/category/parent/${name}`, { observe: "response" });
  }

  /*
        >=> Get All the Product Categories
  */
  getProductCategories() {
    return this.http.get<any>("api/products/categories/all", { observe: "response" });
  }

  /*
        >=> Search Product
  */
  searchProduct(value) {
    return this.http.get<any>(`api/search?q=${value}`);
  }

  /*
        >=> Store Product on server
  */
  storeProduct(data) {
    return this.http.post<any>("api/products/add", data, {
      observe: "response"
    });
  }

  /*
        >=> Store Product Review
  */
  submitProductReview(data) {
    const token = localStorage.getItem("authUser");
    //setting Authorization header with token
    let headers = new HttpHeaders().append("Authorization", token);
    return this.http.post<any>("api/review", data, {
      headers,
      observe: "response"
    });
  }

  /*
        >=> Update Product Details
  */
  updateProduct(data, id) {
    return this.http.put<any>(`api/products/${id}`, data, {
      observe: "response"
    });
  }

  /*
        >=> Update progress image by enabling reportProgress;
  */
  updateProductImage(data, id) {
    const req = new HttpRequest("PUT", `api/products/image/${id}`, data, {
      reportProgress: true
    });
    return this.http.request(req);
  }

  /*
      >=> Store Product Category (Parent and Child Both)
  */
  storeProductCategory(data, parent = false) {
    return this.http
      .post<any>("api/products/category/add", data, {
        observe: "response"
      })
      .do(data => {
        let { category } = data.body;
        //creating a new update notification for all components
        //based on the type of data being stored
        parent ? this.p_categoryUpdate.next(category) : this.c_categoryUpdate.next(category);
      });
  }

  /*
        >=> Remove product from server
  */
  removeProduct(id) {
    return this.http.delete<any>(`api/products/${id}`, {
      observe: "response"
    });
  }

  /*
        >=> Make cart Payment
  */
  makeCharge(cart, token, email) {
    return this.http.post<any>("api/products/checkout", { cart, token, email }, { observe: "response" });
  }
}
