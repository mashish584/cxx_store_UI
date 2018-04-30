import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  UserService,
  CartService,
  OrderService,
  ProductService,
} from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  // Reference of element where we want
  // to mount our stripe elements
  @ViewChild('cardInfo') cardInfo: ElementRef;

  private card: any;
  private cardHandler = this.onChange.bind(this);
  private error: String;
  private disable: boolean = false;

  // current user email & cart details
  private email: String;
  private cart: Object;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private orderService: OrderService,
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.cart = this.cartService.getCart();
  }

  ngOnInit() {
    this.userService.getUserDetail().subscribe(
      (data: any) => {
        let { email } = data.body.user;
        this.email = email;
      },
      (error: any) => {
        let { message } = error.error;
        console.error(message || 'Something went wrong');
        alert('Something went wrong');
      }
    );
  }

  ngAfterViewInit() {
    //using elements from index.html for
    // creating a card
    this.card = elements.create('card');
    // mounting card on cardInfo element
    this.card.mount(this.cardInfo.nativeElement);
    // adding onChange method of this class on card
    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    // remove eventListener and destroy card
    //when user move away from route
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  // using as a reference for strip card element
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    //detect the change
    this.cd.detectChanges();
  }

  /*
    >=> Submitting forn will receuve a token from
    >=> Stripe server and then we will charge user
    >=> against the token issued by stripe
  */
  async onSubmit(form: NgForm) {
    this.disable = true;
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      console.error('Something went wrong - Stripe End', error);
      this.disable = false;
    } else {
      // send token to  your backend to process the charge
      this.productService.makeCharge(this.cart, token, this.email).subscribe(
        (data: any) => {
          let { message, order } = data.body;
          this.orderService.orderUpdate.next(order);
          alert(message);
          //reset cart
          localStorage.removeItem('cart');
          this.disable = false;
          //notify observers
          this.cartService.cartUpdate.next();
          this.router.navigateByUrl('cart');
        },
        (error: any) => {
          alert('Try Again');
          this.card.clear();
          this.disable = false;
        }
      );
    }
  }
}
