import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from './employee/employee.component';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RequestInterceptorInterceptor } from './request-interceptor.interceptor';
import { InitService } from './init.service';
import { AppAnvComponent } from './app-anv/app-anv.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HoverDirective } from './hover.directive';
import { EmailValidatorDirective } from './validators/email-validator.directive';
//import { RoomsModule } from './rooms/rooms.module';
import { HeadersModule } from './header/headers.module';
import { routeToken } from './services/routeService.service';
//import { BookRoomComponent } from './book-room/book-room.component';

function initFactory(initservice:InitService){
  return ()=> initservice.init();
}
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    EmployeeComponent,
    AppAnvComponent,
    NotFoundComponent,
    LoginComponent,
    HoverDirective,
    EmailValidatorDirective,
 
    
    //BookRoomComponent
  ],
  imports: [
    BrowserModule,
    //RoomsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    
    HeadersModule
  ],
  providers: [
    {
      provide:APP_SERVICE_CONFIG,
      useValue:APP_CONFIG
    },
    {
      provide:routeToken,
      useValue:{name:"Home"}
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: RequestInterceptorInterceptor,
      multi: true
    },
    {
      provide:APP_INITIALIZER,
      useFactory:initFactory,
      deps:[InitService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
