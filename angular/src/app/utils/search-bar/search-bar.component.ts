import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSelectChange} from "@angular/material/select";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  filter = "";
  filterCol = "";

  @Input()
  displayedColumns?: string[];

  @Input()
  dataSource?: MatTableDataSource<any>;

  @Output()
  dataSourceChange = new EventEmitter<MatTableDataSource<any>>();

  constructor() { }

  ngOnInit(): void {
    if (!this.dataSource) {
      throw new Error("dataSource is required");
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource!.filter = filterValue.toString().trim().toLowerCase();
    this.dataSourceChange.emit(this.dataSource);
  }

  applyFilterCol(event: MatSelectChange) {
    this.dataSource!.filterPredicate = function (record,filter) {
      console.log(record[event.value]!.toString().toLocaleLowerCase());
      return record[event.value]!.toString().toLocaleLowerCase().includes(filter.toString().toLocaleLowerCase());
    }
    this.dataSourceChange.emit(this.dataSource);
  }

}
