import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
name!:string;
  constructor() { }

  ngOnInit(): void {
  }
toggle(){
  this.name="new s";
  console.log("header by rooms"+this.name)
}
}
