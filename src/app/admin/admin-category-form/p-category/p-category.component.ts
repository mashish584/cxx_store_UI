import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from '../../../core/services';

@Component({
  selector: 'parent-category',
  templateUrl: './p-category.component.html',
})
export class ParentCategory implements OnInit, OnDestroy {
  // Binding input's here in these two variables
  // with ngModel
  public name: String;
  public type: String = 'parent';

  // Storing all categories from services
  public categories: Category[];

  public subscription: Subscription;

  constructor(public productService: ProductService) {
    // Subscribing parent category update notification
    // for updating the current state of categories
    // by pushing new data
    this.subscription = productService.p_categoryUpdate.subscribe(
      (data: Category) => {
        productService.categories.push(data);
        this.categories = productService.categories;
        productService.sub_menuUpdate.next();
      }
    );
  }

  ngOnInit() {
    // populating categories whenever component get initialized
    this.categories = this.productService.categories;
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // Making an call to ProductService StoreProductCategory methods
  // for storing the data user requested
  public addCategory() {
    // creating a brand new category object
    let data: Category = {
      name: this.name,
      type: this.type,
      childs: [{}],
      parent: '',
    };
    // sending a request to productService save category method
    // for saving category on server
    this.productService.storeProductCategory(data, true).subscribe(
      (data: any) => {
        let { message } = data.body;
        // show success message with alert
        alert(message);
        //set name property back to ""
        this.name = '';
      },
      (error: any) => {
        let { message } = error.error;
        //show error message if got any
        // else show "server not responding"
        alert(message || 'Server is not responding.');
      }
    );
  }
}
