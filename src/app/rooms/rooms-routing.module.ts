import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoleGuard } from '../gaurds/role.guard';

const routes: Routes = [
  //for individual guard use canActivate guard each child based on requirements
  // to protect all child route of specific parent route canActivateCild
  {path:"", component:RoomsComponent,canActivateChild:[RoleGuard],
  // children:[{path:"add", component: RoomsAddComponent,//canActivate:[RoleGuard]
  // },
  // {path:":id", component:BookRoomComponent,//canActivate:[RoleGuard]
  // },
  // ]
},
{
  path:'add',component:RoomsAddComponent,canActivate:[RoleGuard]
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
