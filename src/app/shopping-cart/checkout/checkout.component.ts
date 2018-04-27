import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../core/services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit ,AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo:ElementRef;

  card:any;
  cardHandler = this.onChange.bind(this);
  error:String;

  // current user email
  email:String;

  constructor(private cd: ChangeDetectorRef,private userService:UserService){}

  ngOnInit(){
    this.userService.getUserEmail()
        .subscribe(
          (data:any) => {
             let {email} = data.body;
             this.email = email;
          },
          (error:any) => {
            let {message} = error.error;
            console.error(message||"Something went wrong");
            alert("Something went wrong");
          }
        );
  }

  ngAfterViewInit(){
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change',this.cardHandler);
  }

  ngOnDestroy(){
    this.card.removeEventListener('change',this.cardHandler);
    this.card.destroy();
  }

  onChange({error}){
    if(error){
      this.error = error.message;
    }else{
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form:NgForm){
    const {token,error} = await stripe.createToken(this.card);
    if(error){
      console.log('Something went wrong',error);
    }else{
      // send token to  your backend to process the charge
      console.log(token);
    }
  }

}