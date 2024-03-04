import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserItemDialogComponent} from "./user-item-dialog/user-item-dialog.component";
import {IUser} from "../../../assets/IUser";
import {ToastrService} from "ngx-toastr";
import {UserTableComponent} from "./users-table/user-table.component";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild('table') table!: UserTableComponent;
  constructor(private userService: UserService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  showDialog(user: IUser) {
    this.dialog.open(UserItemDialogComponent, {
      data: user
    });
  }

  removeSelectedUser() {
    if (window.confirm(`Are sure you want to delete ${this.table.selection.selected.length} item(s) ?`)) {
      this.toastr.info(`Deleting ${this.table.selection.selected.length} item(s)...`);
      const promises: Promise<void>[] = [];
      this.table.selection.selected.forEach((user) => {
        promises.push(this.userService.deleteUser(user.id));
      });
      Promise.all(promises).then(() => {
        this.toastr.success(`Deleted ${this.table.selection.selected.length} item(s)`);
        this.table.selection.clear();
        window.location.reload();
      });
    }
  }
}
