import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AssociationService} from "../../../services/association.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {IAssociationDialogData} from "../association-item/association-item.component";
import {
  AssociationUserSelectDialogComponent
} from "../association-user-select-dialog/association-user-select-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-association-create',
  templateUrl: './association-create.component.html',
  styleUrls: ['./association-create.component.scss']
})
export class AssociationCreateComponent {
  dialogData: IAssociationDialogData = {
    users: []
  };
  assoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    users: new FormControl(this.dialogData.users, [Validators.required]),
  });
  constructor(private service:AssociationService,
              private router : Router,
              private dialog: MatDialog) { }

  async onFormSubmit(){
    const name:string=this.assoForm.get('name')?.value;
    await this.service.createAssociation({name:name,idUsers:this.dialogData.users.map(user=>user.id)});
    await this.router.navigateByUrl('/associations');
  }
  openUserSelecterDialog() {
    this.dialog.open(AssociationUserSelectDialogComponent, {
      data: this.dialogData
    });
  }


}
