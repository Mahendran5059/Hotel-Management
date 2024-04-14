import { InjectionToken } from "@angular/core";
import { RouteService } from "./routeService";

export const routeToken = new InjectionToken<RouteService>("routeService");