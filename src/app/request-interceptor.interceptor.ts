import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
   if(request.url=="/api/rooms"){
    const newRequest= request.clone({
      headers:new HttpHeaders({token:"fghskalioer674478jhd"})
      
     });
     return next.handle(newRequest);
   }
    return next.handle(request);
  }
}
