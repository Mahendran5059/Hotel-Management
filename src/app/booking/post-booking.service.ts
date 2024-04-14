import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostBookingService {

  constructor(private httpclient:HttpClient) {

   }
  postBookings( booking:any){
    return this.httpclient.post('https://jsonplaceholder.typicode.com/posts',booking);
  }
}
