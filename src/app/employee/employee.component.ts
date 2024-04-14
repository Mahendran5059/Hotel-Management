import { Component, Host, OnInit, Optional, Self, SkipSelf } from '@angular/core';
import { RoomsDataService } from '../rooms/services/rooms-data.service';

@Component({
  selector: 'pro-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [RoomsDataService]
})
export class EmployeeComponent implements OnInit {

  constructor(@Host() private roomService:RoomsDataService) { }
  empName:string="jhon Mac";

  ngOnInit(): void {
  }
  change(empname:string){
    this.empName=empname;
  }

}
