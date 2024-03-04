import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenHttpInterceptor} from "./interceptors/token.interceptor";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { NavComponent } from './utils/nav/nav.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AssociationsListComponent } from './pages/associations-list/associations-list.component';
import {ToastrModule} from "ngx-toastr";
import { AssociationItemComponent } from './pages/associations-list/association-item/association-item.component';
import {MatSelectModule} from "@angular/material/select";
import { AssociationCreateComponent } from './pages/associations-list/association-create/association-create.component';
import { SearchBarComponent } from './utils/search-bar/search-bar.component';
import {UserItemComponent} from "./pages/users-list/user-item/user-item.component";
import {UserCreateComponent} from "./pages/users-list/user-create/user-create.component";
import {MatDialogModule} from "@angular/material/dialog";
import { UserItemDialogComponent } from './pages/users-list/user-item-dialog/user-item-dialog.component';
import {UserItemPageComponent} from "./pages/users-list/user-item-page/user-item-page.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {UserTableComponent} from "./pages/users-list/users-table/user-table.component";
import {
  AssociationUserSelectDialogComponent
} from "./pages/associations-list/association-user-select-dialog/association-user-select-dialog.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavComponent,
        AssociationsListComponent,
        AssociationItemComponent,
        AssociationCreateComponent,
        SearchBarComponent,
        UsersListComponent,
        UserItemComponent,
        UserCreateComponent,
        UserItemDialogComponent,
        UserItemPageComponent,
      UserTableComponent,
      AssociationUserSelectDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule
  ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenHttpInterceptor,
        multi: true,
    }
    ],
  exports: [
    UserItemComponent,
    UserTableComponent
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
