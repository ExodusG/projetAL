import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {AuthService} from "./services/auth.service";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', loadChildren: () => import('./pages/users-list/users-list.module').then(m => m.UsersListModule), canActivate: [AuthGuard] },
  { path: 'associations', loadChildren: () => import('./pages/associations-list/associations-list.module').then(m => m.AssociationsListModule), canActivate: [AuthGuard] },
  {path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
