import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {IUser} from "../../../../assets/IUser";
import {SelectionModel} from "@angular/cdk/collections";
import {UserService} from "../../../services/user.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-users-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>([]);
  displayedColumns: string[] = ['select', 'id', 'lastname', 'firstname', 'age'];
  @Input() showDialog?: (user: IUser) => void;
  @Input() selected?: IUser[];
  selection = new SelectionModel<IUser>(true, this.selected ?? []);


  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.userService.getUsers().then((users: IUser[] ) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.selected?.forEach(user => {
        this.selection.select(this.dataSource.data[this.dataSource.data.findIndex(u => u.id === user.id)]);
      });
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}
