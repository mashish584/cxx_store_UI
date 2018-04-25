import { ProductService } from './core/services/products.service';
import { Component, ViewEncapsulation, OnInit, OnChanges, Inject } from '@angular/core';
import { Router,NavigationStart, NavigationCancel } from '@angular/router';
import { DOCUMENT }  from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  isAdmin:boolean = false;
  isFullFooter:boolean = true;

  constructor(private router:Router,private productService:ProductService){

    /*
      >=> Function to capture current route to check is
      >=> current page === admin | signin | signup
      >=> page for handling the visibility and type of
      >=> header component and footer component
    */
    router.events.subscribe((event) => {

        if(event instanceof NavigationStart){
            let { url } = event;
            this.isAdmin = url.match('/admin') ? true:false;
            this.isFullFooter = url.match('/signin') || url.match('/signup') ? false : true;
        }

    });

  }


  ngOnInit(){
     this.productService.getProductCategories()
         .subscribe(
           (data:any) => {
              //get all parent and child categories from parent
              let {categories} = data.body;
              // filter both parent and child categories in seperate
              let p_categories = categories.filter(category => category.type === "parent");
              let c_categories = categories.filter(category => category.type === "child");
              // populate p_categories with child categories
              let values = p_categories.map(parent => {
                  parent.childs = categories.filter(category => category.parent === parent.name);
                  //@return parent with updated child property
                  return parent;
              });

              // store all categories in service to
              // make it availabe across all components
              // without making any additional http requests
              this.productService.categories = values;
              this.productService.c_categories = c_categories;

              // set notification for categories loaded
              this.productService.sub_menuUpdate.next();
           },
            //trow error if any
           (error:any) => alert("Something went wrong")
         )
  }

}
