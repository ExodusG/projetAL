import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AssociationsListComponent} from "./associations-list.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AssociationItemComponent} from "./association-item/association-item.component";
import {AssociationCreateComponent} from "./association-create/association-create.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AssociationsListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: AssociationCreateComponent, canActivate: [AuthGuard] },
      { path: ':id', component: AssociationItemComponent,canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssociationsListRoutingModule { }
