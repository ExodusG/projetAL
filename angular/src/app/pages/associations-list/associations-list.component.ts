import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {AssociationService} from "../../services/association.service";
import {MatTableDataSource} from "@angular/material/table";
import {IAssociation} from "../../../assets/IAssociation";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss']
})
export class AssociationsListComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource: MatTableDataSource<IAssociation> = new MatTableDataSource<IAssociation>();
  displayedColumns: string[] = ['id', 'name', 'users'];
  constructor(private associationService: AssociationService) { }

  ngOnInit(): void {
    this.associationService.getAssociations().then((associations) => {
      this.dataSource.data = associations;
      this.dataSource.paginator = this.paginator;
    });
  }

}
