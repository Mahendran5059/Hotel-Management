import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'pro-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private loginService: LoginService ) { }
  email!: string;
  password!:string;
  valueText!:string;
  error=false;

  ngOnInit(): void {
  }
  login(data: NgForm){
      if(this.loginService.logIn(this.email,this.password)){

        //alert(" Login Successful");
        
       this.router.navigate(["/rooms"])
      }
      else{
        this.error=true;
      }
      data.reset();


  }

}
