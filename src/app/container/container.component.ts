import { AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { Console } from 'console';

@Component({
  selector: 'pro-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, AfterContentInit, AfterViewInit {

  constructor() { }
  
  @ContentChild(EmployeeComponent)
  emp!:EmployeeComponent; //= new EmployeeComponent();

  ngOnInit(): void {
    console.log("OnInit container");
  }
  ngAfterViewInit(): void {
    console.log("after viewInit container");
    //this.emp.empName="viewInit";
  }
  // here AfterContentInit used because content of container Component is passed by parent component which is uncertain
  ngAfterContentInit(): void {
    console.log(this.emp.empName);
    console.log("content initialized");
    // this.emp.empName="Jhon Mac Donald".toString();
    this.emp.change("Jhon Mac Donald");
    console.log(this.emp.empName);
  }

}
