import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { UserService} from "../../../services/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserItemComponent} from "../user-item/user-item.component";
import {IUser} from "../../../../assets/IUser";

@Component({
  selector: 'app-user-item-dialog',
  templateUrl: './user-item-dialog.component.html',
  styleUrls: ['./user-item-dialog.component.scss']
})
export class UserItemDialogComponent implements OnInit {

  @ViewChild(UserItemComponent) itemComp! : UserItemComponent;

  constructor(
    private service:UserService,
    public dialogRef: MatDialogRef<UserItemComponent>,
    @Inject(MAT_DIALOG_DATA) public user: IUser,){}


  async ngOnInit(): Promise<void> {
    const assos = await this.service.getAssociation(this.user.id);
    this.user.associations = assos;

    // On fait une copy pour que le composant enfant se refresh
    this.user = {...this.user};
  }

}
