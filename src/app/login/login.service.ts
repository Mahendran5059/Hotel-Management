import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  isLoggedIn:boolean=false;
  isAdmin:boolean=false;

  logIn(user:string, password:string){
    if(user=="user@gmail.com" && password=="password"){
      this.isLoggedIn=true;
    }
    if(user=="admin@gmail.com" && password=="adminadmin"){
      this.isLoggedIn=true;
      this.isAdmin=true;
    }
    return this.isLoggedIn;
  }
}
