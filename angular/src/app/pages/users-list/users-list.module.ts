import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersRoutingModule} from "./users-routing.module";
import { UserItemPageComponent } from './user-item-page/user-item-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {UserItemComponent} from "./user-item/user-item.component";
import { UserTableComponent } from './users-table/user-table.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class UsersListModule { }
