import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { FormsModule } from '@angular/forms';
import { HeadersModule } from '../header/headers.module';
import { routeToken } from '../services/routeService.service';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    BookRoomComponent,
    RoomsAddComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    FormsModule,
    HeadersModule
  ],
  providers:[
    {
      provide:routeToken,
      useValue:{name:"Rooms"}
    },
  ]
})
export class RoomsModule { }
