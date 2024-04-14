import { DatePipe } from "@angular/common";

export interface Room{
    totalRooms:number;
    availRooms:number;
    bookedRooms:number;
}

export interface RoomList{
    roomNumber:string;
    roomType: string;
    amenities: string;
    price: number |null;
    photos: string;
    checkinTime: Date | null;
    checkoutTime: Date | null;
    rating:number | null;

}