import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'pro-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.css']
})
export class BookRoomComponent implements OnInit {
  //id$=this.route.params.pipe(map((param)=> param['id']));
  //id$:any;
  id$=this.route.paramMap.pipe(map((param)=>  param.get("id")));

  constructor(private route:ActivatedRoute) { }
// use subscribe method also
// can use queryparam also instead of params
//id=this.route.snapshot.params['id'];
  ngOnInit(): void {
    
  
    //console.log(this.id$);
  }

}
