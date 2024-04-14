import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'pro-root',
  // template:'<h1>hi</h1>',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  title = 'project1';
  role: string = 'admin';
  // @ViewChild('user', { read: ViewContainerRef })
  // vsr!: ViewContainerRef;

  @ViewChild('name') name!: ElementRef;
  ngAfterViewInit(): void {
    // const componentRef=this.vsr.createComponent(RoomsComponent);
    // componentRef.instance.noOfRooms=10;
    // this.name.nativeElement.innerHTML="ElementRef";
  }
  constructor(
    @Inject(localStorageToken) private localStorage: any,
     private initservice: InitService, 
     private configService: ConfigService,
     private route:Router
     ) {
    console.log(initservice.config)

  }
  ngOnInit() {
    //this.route.events.subscribe((event)=>{console.log(event)});
    this.route.events.pipe(filter((event)=> event instanceof NavigationStart)).subscribe((event)=> console.log(event));
    this.route.events.pipe(filter((event)=> event instanceof NavigationEnd)).subscribe((event)=> console.log(event));
    this.localStorage.setItem('name', 'Hotel Ganapathi');

  }
}
