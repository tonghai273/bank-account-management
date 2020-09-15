import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Employee } from 'src/app/shared/models/employee-model';
import { PagingModel } from 'src/app/shared/models/paging-model';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { EMPLOYEE_DATA_COLUMNS, EMPLOYEE_DATA_TYPE, MESSAGE, STATUS } from 'src/app/shared/utils/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DetailAccountComponent } from '../detail-account/detail-account.component';
import { EmployeeEditService } from 'src/app/shared/services/employee/employee-edit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/guard/auth.service';
import { Role } from 'src/app/shared/models/role';
import { SortModel } from 'src/app/shared/models/sort-model';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.scss']
})
export class ListAccountComponent implements OnInit {

  // list columns table
  listColumns: string[] = EMPLOYEE_DATA_COLUMNS
  // list data field type
  listDataType: string[] = EMPLOYEE_DATA_TYPE
  // list of the employee
  listEmployees: Employee[] = []
  //
  idEmployee = ''
  // paging of table
  pagingModel = new PagingModel()
  //  sort model
  sortModel: SortModel = new SortModel()
  // employee
  employeeModel = new Employee()
  // page idnex
  pageIndex: number = 1
  // page size
  size: number = 50
  // status loading table
  isLoadingTable = false
  //search
  validateForm!: FormGroup;

  constructor(
    private emp: EmployeeService,
    private message: NzMessageService,
    private modal: NzModalService,
    private epmEdit: EmployeeEditService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.pagingModel.size = this.size
    this.pagingModel.page = this.pageIndex

    this.sortModel.sort = ''
    this.sortModel.column = ''

    this.getEmployees(this.pagingModel, this.sortModel)

    //search
    this.validateForm = this.fb.group({
      // _id: new FormControl(),
      account_number: [null, []],
      balance: [null, []],
      firstname: [null, []],
      lastname: [null, []],
      age: [null, []],
      gender: [null, []],
      address: [null, []],
      employer: [null, []],
      email: [null, [Validators.email]],
      city: [null, []],
      state: [null, []],
    });

  }

  getEmployees(params: any, sortModel: SortModel) {
    this.isLoadingTable = true

    this.emp.getEmployees(params, sortModel).subscribe(data => {
      setTimeout(() => {
        this.listEmployees = data[0].customers
        this.pagingModel = data[0].paging
        this.isLoadingTable = false
      }, 1500);
    })
  }

  //
  editEmployee(data: any) {
    this.epmEdit.setEmployeeID(data._id)

    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: DetailAccountComponent,
      nzClosable: true,
      nzFooter: null,
      nzWidth: '900px',
    }).afterClose.subscribe(_ => {
      this.getEmployees(this.pagingModel, null)
    })
  }

  // delete by id
  confirmDelete(data: any) {
    this.emp.deleteEmployeeByID(data._id.toString()).subscribe(response => {
      let res: any = response
      if (res.status === STATUS.SUCCESS) {
        this.getEmployees(this.pagingModel, this.sortModel)
        this.message.error(data.employer + ' was deleted!');
      }
    })
  }

  // check role
  get isAdmin() {
    return this.auth.hasRole(Role.Admin)
  }

  // search employee
  searchEmployee() {
    this.pagingModel.size = 50
    this.pagingModel.page = 1
    this.employeeModel.account_number = 25
    let params = Object.assign(this.pagingModel, this.employeeModel)
    this.getEmployees(params, this.sortModel)
  }

  // sort data
  sortData(sortModel: SortModel) {
    this.sortModel = sortModel
    if (this.sortModel.sort === 'ascend') {
      this.sortModel.sort = 'asc'
      this.message.info(MESSAGE.SORT_ASC)
    }
    if (this.sortModel.sort === 'descend') {
      this.sortModel.sort = 'desc'
      this.message.info(MESSAGE.SORT_DESC)
    } if (this.sortModel.sort === null) {
      this.sortModel.sort = ''
      this.sortModel.column = ''
      this.message.info(MESSAGE.SORT_NUL)
    }
    this.getEmployees(this.pagingModel, this.sortModel)
  }

  // change page index
  pageIndexChange(event: number) {
    this.pagingModel.page = event

    this.getEmployees(this.pagingModel, this.sortModel)
  }

  // change page size
  pageSizeChange(event: number) {
    this.pagingModel.size = event
    this.getEmployees(this.pagingModel, this.sortModel)
  }
}
