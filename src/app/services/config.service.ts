import { Inject, Injectable } from '@angular/core';
import { RouteService } from './routeService';
import { routeToken } from './routeService.service';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(routeToken) private routeServiceToken:RouteService) {
    console.log("service config initiated -------------");
    console.log(routeServiceToken);
   }
}
