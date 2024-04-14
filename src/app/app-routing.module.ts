import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookRoomComponent } from './rooms/book-room/book-room.component';
import { RoomsAddComponent } from './rooms/rooms-add/rooms-add.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './gaurds/login.guard';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"employee",component:EmployeeComponent ,canActivate:[LoginGuard]},
  {
    path:"rooms", loadChildren:()=> import('./rooms/rooms.module').then((m)=> m.RoomsModule)//,canActivate:[LoginGuard],canLoad:[LoginGuard]
  },
  {path:"",redirectTo:"login",pathMatch:"full"},
  { path: 'booking/:id', loadChildren: () => import('./booking/booking.module').then((m) => m.BookingModule),
  //canActivate:[LoginGuard], canLoad:[LoginGuard]
 },
  {path:"**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
