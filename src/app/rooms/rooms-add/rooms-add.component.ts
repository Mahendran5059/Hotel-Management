import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsDataService } from '../services/rooms-data.service';
import { NgForm } from '@angular/forms';
import {RoomsComponent} from '../rooms.component';
import { ConfigService } from 'src/app/services/config.service';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'pro-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent implements OnInit {

  constructor(private roomdataservice:RoomsDataService) { }
  tdy=new Date().getUTCDate();
  msg!: string;

  ngOnInit(): void {
  }
  newroom: RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    price:null,
    photos: "",
    checkinTime: null,
    checkoutTime: null,
    rating:null
  }
  addRooms(addRooms:NgForm){
  this.roomdataservice.addRooms(this.newroom).subscribe((data)=>{console.log(data); this.msg="Room added successfully"});

    addRooms.reset();
  }
  

}
