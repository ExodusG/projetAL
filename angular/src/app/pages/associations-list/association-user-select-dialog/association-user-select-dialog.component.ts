import {Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUser} from "../../../../assets/IUser";
import {UserTableComponent} from "../../users-list/users-table/user-table.component";
import {IAssociationDialogData} from "../association-item/association-item.component";

@Component({
  selector: 'app-association-user-select-dialog',
  templateUrl: './association-user-select-dialog.component.html',
  styleUrls: ['./association-user-select-dialog.component.scss']
})
export class AssociationUserSelectDialogComponent implements OnInit, OnChanges {

  @ViewChild("table") table!: UserTableComponent;

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: IAssociationDialogData) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    }

  ngOnInit(): void {
  }

  confirm() {
    this.data.users = this.table.selection.selected;
    this.dialogRef.close();
  }
}
