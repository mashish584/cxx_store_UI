import {
  ProductService,
  AuthService,
  UserService,
  OrderService,
} from './core/services';
import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  Inject,
} from '@angular/core';
import { Router, NavigationStart, NavigationCancel } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAdmin: boolean = false;
  isFullFooter: boolean = true;
  isLoggedIn: boolean = false;

  orders;
  showOrders: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService,
    private userService: UserService
  ) {

    /*
      >=> Push new order in order List
    */
    this.orderService.orderUpdate.subscribe(data => this.orders.push(data));

    /*
      >=> Function to capture current route to check is
      >=> current page === admin | signin | signup
      >=> page for handling the visibility and type of
      >=> header component and footer component
    */
    router.events.subscribe(event => {
      //set scroll position to top
      window.scrollTo(0, 0);
      if (event instanceof NavigationStart) {
        let { url } = event;
        this.isAdmin = url.match('/admin') ? true : false;
        this.isFullFooter =
        url.match('/signin') || url.match('/signup') ? false : true;
        // check the user status on each route change
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }

  ngOnInit() {



    /*
      >=> Get the loggedIn user details and store user orders
      >=> if loggedIn is true
    */
      this.getLoggedInUser();
      this.authService.loggedInSubject
          .subscribe(() => this.getLoggedInUser());

    /*
      >=> get all parent and child categories
      >=> store all of them in product services
    */

    this.productService.getProductCategories().subscribe(
      (data: any) => {
        //get all parent and child categories from parent
        let { categories } = data.body;
        // filter both parent and child categories in seperate
        let p_categories = categories.filter(
          category => category.type === 'parent'
        );
        let c_categories = categories.filter(
          category => category.type === 'child'
        );
        // populate p_categories with child categories
        let values = p_categories.map(parent => {
          parent.childs = categories.filter(
            category => category.parent === parent.name
          );
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
      //throw error if any
      (error: any) => alert('Something went wrong')
    );
  }

  // show order Box
  triggerOrder(e) {
    this.showOrders = e;
  }

  // hide order Box
  closeOrder() {
    this.showOrders = false;
  }

  // if loggedIn get user details
  getLoggedInUser(){
      this.isLoggedIn = this.authService.isLoggedIn();
      if(this.isLoggedIn){
        this.userService.getUserDetail().subscribe(
          (data: any) => {
            let { user } = data.body;
            this.orders = user.orders;
          },
          (error: any) => {
            console.log(error);
            alert('Something went wrong');
          }
        );
      }
  }

}
