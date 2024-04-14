import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms'
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { RoomsDataService } from './services/rooms-data.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'pro-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, AfterViewInit, OnDestroy {


  hotelName: String = 'Hotel Ganapathi';
  noOfRooms: number = 30;
  isHide: boolean = true;
  titleValue: string = "Room List";
  roomList: RoomList[] = [];
  subscription!: Subscription;
  //hearder1 = new HeaderComponent();
  stream = new Observable((observe) => {
    observe.next("user1");
    observe.next("user2");
    observe.complete();
  })


  constructor(private roomsDtaService: RoomsDataService, 
    private configService: ConfigService,
    //private route:Router
    ) { }

  @ViewChild(HeaderComponent)
  headerobj: HeaderComponent = new HeaderComponent();
  @ViewChildren(HeaderComponent)
  //headerChildren!: HeaderComponent[];
  headerChildren!: QueryList<HeaderComponent>;
  error$=new Subject<String>(); 
  //headers!: HeaderComponent;
  //getRooms$ = this.error$.asObservable();
  rooms$ = this.roomsDtaService.getRooms$;
    // rooms$ = this.roomsDtaService.getRooms$.pipe(
    //   catchError((err) => {
    //     console.log(err); 
    //     this.error$.next(err.message); //when erver we call next . change detection will ran. so, try to avoid this.
    //     return [];
    //   }
    //   ));
  noOfRooms$=this.roomsDtaService.getRooms$.pipe(map((roomLen)=>roomLen.length));

  ngOnInit(): void {
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log("complete"),
      error: (err) => console.log(err)
    })
    //this.route.events.subscribe((event)=>{console.log(event,"form rooms")});//works well
    this.subscription = this.roomsDtaService.getRooms$.subscribe(
      rooms => {
        this.roomList = rooms;
      }
    );
    // console.log(this.subscription);
   // this.roomsDtaService.getPhotos().subscribe((data) => console.log(data));
    // console.log(this.subscription);
  }
  ngAfterViewInit(): void {
    // this.headerobj.name = "new";
    // this.headerChildren.last.name = "last";
    // this.headers=this.headerChildren[0];
    // this.headers.name="seacond";
    // console.log();
  }

  toggle(): void {
    //this.hearder1.toggle();
    this.isHide = !this.isHide;
    this.titleValue = "RoomsList";
    //this.hearder1.name="new";
  }

  rooms: Room = {
    totalRooms: 30,
    availRooms: 20,
    bookedRooms: 10,
  }
  selectedRooms!: RoomList;


  selectRoomOut(room: RoomList) {
    //console.log(room);
    this.selectedRooms = room;
  }

  newroom: RoomList = {
    roomNumber: '6',
    roomType: 'deluxe plus',
    amenities: 'fan, Fridge, cooler, Micro oven, washing machine, led TV, wifi pushable bed chair soofa',
    price: 1700,
    photos: "n/a",
    checkinTime: new Date("12-05-2023"),
    checkoutTime: new Date("12-06-2023") || DatePipe,
    rating: 4.5
  }
  addRoom(room:RoomList) {
    //this.roomList = [...this.roomList, this.newroom];
    this.roomsDtaService.addRooms(room).subscribe((data) => {
      console.log(this.roomList);
      this.roomList = data;
    })
  }
  editRoom() {
    // const roomValue: RoomList = {
    //   roomNumber: '3',
    //   roomType: 'deluxe plus',
    //   amenities: 'fan, Fridge, cooler, Micro oven, washing machine, led TV, wifi pushable bed chair soofa',
    //   price: 1700,
    //   photos: "n/a",
    //   checkinTime: new Date("12-05-2023"),
    //   checkoutTime: new Date("12-06-2023") || DatePipe,
    //   rating: 4.5
    // }
    // this.roomsDtaService.updateRooms(roomValue).subscribe((data) => {
    //   this.roomList = data;
    // })
    this.rooms$=this.roomsDtaService.getRooms();
  }
  deleteRoom() {
    this.roomsDtaService.deleteRooms('6').subscribe((data) => {
      this.roomList = data;
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}


