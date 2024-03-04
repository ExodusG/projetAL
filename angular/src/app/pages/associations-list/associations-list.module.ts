import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociationsListRoutingModule } from './associations-list-routing.module';
import { AssociationUserSelectDialogComponent } from './association-user-select-dialog/association-user-select-dialog.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AssociationsListRoutingModule
  ]
})
export class AssociationsListModule { }
