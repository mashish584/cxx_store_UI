import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService,CartService, UtilsService, UserService } from '../../core/services';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
})
export class SingleProduct implements OnInit,AfterViewInit {
  product;
  featureTypes: String[] = [];
  featureValues: String[] = [];

  reviewForm: boolean = false;

  // boolean to check user is allowed
  // for review or not
  userAllowToReview:boolean = false;

  // stars tracking
  fullStars = [];
  halfStars = [];
  noStars = [];

  r_fullStars = [];
  r_halfStars = [];
  r_noStars = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartService,
    private userService:UserService,
    private utilsService:UtilsService
  ) { }

  ngOnInit() {
    /*
      >=> Get the product with route
      >=> param {id}
    */
    this.route.params.subscribe((params: Params) => {
      let { id } = params;
      this.productService.getProduct(id).subscribe(
        (data: any) => {
          let { product, averageRating } = data.body;
          let features = JSON.parse(product.productFeatures);
          this.product = product;
          Object.keys(features).map(key => {
            this.featureTypes.push(key);
            this.featureValues.push(features[key]);
          });
          // store average in product object
          product.average = averageRating.length > 0 ? averageRating[0].average : 0;
          this.utilsService.resetStars();
          this.calculateStars(product,0);
        },
        (error: any) => {
          alert('Something went wrong');
          this.router.navigateByUrl('');
        }
      );
    });
  }

  ngAfterViewInit(){
    /*
      >=> Checking is user is allow to
      >=> review current product or not
    */
    this.userService.getUserDetail()
        .subscribe(
          (data:any) => {
            let {user} = data.body;
            let {cart} = user.orders;
            let {reviews} = this.product;
            let purchasedItem = false;
            let reviewedItem = false;
            user.orders.map(order => {
              order.cart.map(item => {
                item.items.map(item => (purchasedItem = item.id === this.product._id ? true:false));
              });
            });
            reviews.map(review => (reviewedItem = review.user._id === user._id ? true:false));
            this.userAllowToReview = purchasedItem && !reviewedItem;
          },
          (error:any) => {
            console.error(error);
          }
        );
  }

  //show review form
  showForm() {
    this.reviewForm = true;
  }

  //hide review form
  hideForm() {
    this.reviewForm = false;
  }

  /*
      >=> Submit user review
      >=> and update product reviews
  */
  submitReview(form) {
    let data = { ...form.value, product: this.product._id };
    this.productService.submitProductReview(data).subscribe(
      (data: any) => {
        let { review } = data.body;
        this.product.reviews.push(review);
        this.reviewForm = false;
        this.userAllowToReview = false;
        form.reset();
      },
      (error: any) => {
        let { message } = error.error;
        console.error(error);
        alert(message);
        this.reviewForm = false;
      }
    );
  }

  /*
    >=> Add Product to cart
  */
  addToCart(product) {
    product = {
      id: product._id,
      title: product.productTitle,
      price: product.productPrice,
      image: product.productImg,
      qty: 1,
    };
    this.cartService.addProductToCart(product);
  }

  /*
    >=> Get average and count half
    >=> and full stars
  */
  calculateStars(product,index){

    [
      this.fullStars,
      this.halfStars,
      this.noStars
    ] = this.utilsService.calculateProductStars(product,index);

    // calculating review stars
    product.reviews.map((review,index) => {
      [
        this.r_fullStars,
        this.r_halfStars,
        this.r_noStars
      ] = this.utilsService.calculateReviewStars(review.rating,index);
    });
  }

}
