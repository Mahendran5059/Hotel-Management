import { Injectable,Inject } from '@angular/core';
import { RoomList } from '../rooms';
import { DatePipe } from '@angular/common';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsDataService {

  constructor(@Inject(APP_SERVICE_CONFIG) private config:AppConfig, private http:HttpClient) { 
    console.log("Service initialized")
    console.log(config.apiEndPoint)
  }
   roomlist: RoomList[] = [//{
  //   roomNo: 1,
  //   roomType: 'deluxe Ac',
  //   amenities: 'AC, Fridge, cooler, Micro oven, washing machine, led TV, wifi ',
  //   price: 1500,
  //   photos: "n/a",
  //   checkinTime: new Date("12-05-2023"),
  //   checkoutTime: new Date("12-06-2023")
  // },
  // {
  //   roomNo: 2,
  //   roomType: 'ordinary',
  //   amenities: 'Fridge, washing machine, led TV ',
  //   price: 800,
  //   photos: "n/a",
  //   checkinTime: new Date("12-05-2023"),
  //   checkoutTime: new Date("12-06-2023")
  // },
  // {
  //   roomNo: 3,
  //   roomType: 'AC',
  //   amenities: 'AC, Fridge,  Micro oven, washing machine, led TV ',
  //   price: 1000,
  //   photos: "n/a",
  //   checkinTime: new Date("12-05-2023"),
  //   checkoutTime: new Date("12-06-2023")
  // },
  // {
  //   roomNo: 4,
  //   roomType: 'deluxe Ac',
  //   amenities: 'AC, Fridge, washing machine, led TV ',
  //   price: 1300,
  //   photos: "n/a",
  //   checkinTime: new Date("12-05-2023"),
  //   checkoutTime: new Date("12-06-2023")
  // },
  // {
  //   roomNo: 5,
  //   roomType: 'deluxe ',
  //   amenities: 'fan, Fridge, cooler, Micro oven, washing machine, led TV, wifi ',
  //   price: 1000,
  //   photos: "n/a",
  //   checkinTime: new Date("12-05-2023"),
  //   checkoutTime: new Date("12-06-2023") || DatePipe
  // },
  ];
  hearders= new HttpHeaders({token:"ardghbnbfk29383bbbdcj8"})

  getRooms$=this.http.get<RoomList[]>('/api/rooms',{headers:this.hearders}).pipe(shareReplay(1));

  getRooms(){
    return this.http.get<RoomList[]>('/api/rooms');

  }

  addRooms(room:RoomList){
    return this.http.post<RoomList[]>('/api/rooms',room);
  }

  updateRooms(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  deleteRooms(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos(){
    const request= new HttpRequest("GET","https://jsonplaceholder.typicode.com/photos",{
      reportProgress:true
    })
    return this.http.request(request);
  }

}
