import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UsersListComponent} from "./users-list.component";
import {AuthGuard} from "../../guards/auth.guard";
import {UserItemComponent} from "./user-item/user-item.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserItemPageComponent} from "./user-item-page/user-item-page.component";

const routes: Routes = [
  { path: '',
    children: [
      { path: '',pathMatch: "full", component: UsersListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: UserCreateComponent, canActivate: [AuthGuard] },
      { path: ':id', component: UserItemPageComponent, canActivate: [AuthGuard] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class UsersRoutingModule { }
