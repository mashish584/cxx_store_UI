import { Component, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { Router,NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  isAdmin:boolean = false;
  isFullFooter:boolean = true;

  constructor(private router:Router){
    router.events.subscribe((event) => {
        if(event instanceof NavigationStart){
            let {url} = event;
            this.isAdmin = url.match('/admin') ? true:false;
            this.isFullFooter = url.match('/signin') || url.match('/signup') ? false : true;
        }
    });
  }

}
