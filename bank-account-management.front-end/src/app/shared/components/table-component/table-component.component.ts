import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagingModel } from '../../models/paging-model';
import { SortModel } from '../../models/sort-model';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  // input data
  @Input() dataTable: any[] = []
  @Input() listColumns: string[] = []
  @Input() listDataType: string[] = []
  @Input() paging: PagingModel = new PagingModel()
  @Input() showSizeChanger: boolean = false
  @Input() isLoadingTable: boolean = false
  @Input() isEdit: boolean = false
  @Input() isDelete: boolean = false

  // output event emit
  @Output('pageSizeChangeEvent') pageSizeChangeEvent = new EventEmitter<number>()
  @Output('pageIndexChangeEvent') pageIndexChangeEvent = new EventEmitter<number>()
  @Output('confirmDeleteEvent') confirmDeleteEvent = new EventEmitter<number>()
  @Output('editDataEvent') editDataEvent = new EventEmitter<any>()
  @Output('sortChangeEvent') sortChangeEvent = new EventEmitter<any>()

  constructor() { }

  ngOnInit() {
    if (this.isEdit === false && this.isDelete === false) {
      this.listColumns.splice(this.listColumns.length - 1, 1)
    }
  }

  // change page size
  pageSizeChange(event: number) {
    this.pageSizeChangeEvent.emit(event)
  }

  // change page index
  pageIndexChange(event: number) {
    this.pageIndexChangeEvent.emit(event)
  }

  confirmDelete(data: any) {
    this.confirmDeleteEvent.emit(data)
  }

  editData(data: any) {
    this.editDataEvent.emit(data)
  }
  sortChange(sort: string, column: string) {
    let getColumn = ''
    for (let i = 0; i < this.listColumns.length; i++) {
      if (column === this.listColumns[i]) {
        getColumn = this.listDataType[i]
      }
    }

    let sortModel: SortModel = {
      sort: sort,
      column: getColumn
    }

    this.sortChangeEvent.emit(sortModel)
  }
}
