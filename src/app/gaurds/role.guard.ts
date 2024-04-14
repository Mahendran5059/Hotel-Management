import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild, CanActivate {
  constructor(private loginService: LoginService,private routes:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginService.isAdmin){
        alert("you are not authorized user to access this");
      }
      return this.loginService.isAdmin? true:this.routes.navigate(['/rooms']);
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loginService.isAdmin){
      alert("you are not authorized user to access this");
    }
    return this.loginService.isAdmin? true:this.routes.navigate(['/rooms']);
  }
  
}
