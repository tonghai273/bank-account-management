import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../shared/services/employee/employee.service';
import { Employee } from '../../../../shared/models/employee-model';
import { MESSAGE, STATUS } from 'src/app/shared/utils/utils';
import { UtilsValidate } from 'src/app/shared/utils/validate';
import { EmployeeEditService } from 'src/app/shared/services/employee/employee-edit.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-detail-account',
    templateUrl: './detail-account.component.html',
    styleUrls: ['./detail-account.component.scss']
})
export class DetailAccountComponent implements OnInit, OnDestroy {

    employeeForm!: FormGroup;
    selectedGender: string;
    employee: Employee;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private empEdit: EmployeeEditService,
        private modal: NzModalRef,
        private message: NzMessageService) {
    }
    ngOnDestroy(): void {
        this.modal.close()
    }

    ngOnInit() {
        this.employeeForm = this.fb.group({
            _id: new FormControl(),
            account_number: [null, [Validators.required]],
            balance: [null, [Validators.required, UtilsValidate.validateBalance]],
            firstname: [null, [Validators.required]],
            lastname: [null, [Validators.required]],
            age: [null, [Validators.required, UtilsValidate.validateAge]],
            gender: [null, []],
            address: [null, [Validators.required]],
            employer: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            city: [null, [Validators.required]],
            state: [null, [Validators.required]],
        });

        this.getEmployeeByID()
    }

    submitForm(): void {
        for (const i in this.employeeForm.controls) {
            this.employeeForm.controls[i].markAsDirty();
            this.employeeForm.controls[i].updateValueAndValidity();
        }

        if (this.employeeForm.valid) {
            this.updateEmployee()
        } else {
            return
        }
    }

    getEmployeeByID() {
        this.empEdit.getEmployeeID().subscribe(id => {
            if (id !== '') {
                this.employeeService.findEmployeeById(id).subscribe(response => {
                    let data: any = response
                    if (data.status === STATUS.SUCCESS) {
                        this.employee = data.customer
                    }
                    this.setEmployeeByID(this.employee)
                })
            }
        })
    }

    setEmployeeByID(employee: Employee) {
        if (employee !== null) {
            this.employeeForm.controls['_id'].setValue(employee._id)
            this.employeeForm.controls['account_number'].setValue(employee.account_number)
            this.employeeForm.controls['address'].setValue(employee.address)
            this.employeeForm.controls['age'].setValue(employee.age)
            this.employeeForm.controls['balance'].setValue(employee.balance)
            this.employeeForm.controls['city'].setValue(employee.city)
            this.employeeForm.controls['email'].setValue(employee.email)
            this.employeeForm.controls['employer'].setValue(employee.employer)
            this.employeeForm.controls['firstname'].setValue(employee.firstname)
            this.employeeForm.controls['gender'].setValue(employee.gender)
            this.employeeForm.controls['lastname'].setValue(employee.lastname)
            this.employeeForm.controls['state'].setValue(employee.state)
        }
    }

    updateEmployee() {
        let _id = this.employeeForm.controls['_id'].value
        let account_number = this.employeeForm.controls['account_number'].value
        let fisrt_name = this.employeeForm.controls['firstname'].value
        let last_name = this.employeeForm.controls['lastname'].value
        let age = this.employeeForm.controls['age'].value
        let gender = this.employeeForm.controls['gender'].value
        let email = this.employeeForm.controls['email'].value
        let employer = this.employeeForm.controls['employer'].value
        let city = this.employeeForm.controls['city'].value
        let state = this.employeeForm.controls['state'].value
        let balance = this.employeeForm.controls['balance'].value
        let address = this.employeeForm.controls['address'].value

        let employee: Employee = {
            _id: _id,
            account_number: account_number,
            firstname: fisrt_name,
            lastname: last_name,
            age: age,
            gender: gender,
            email: email,
            employer: employer,
            city: city,
            state: state,
            balance: balance,
            address: address
        }
        this.employeeService.updateEmployee(employee).subscribe(response => {
            let data: any = response
            if (data.status === STATUS.SUCCESS) {
                this.message.success(employee._id + MESSAGE.UPDATE_SUCCESS)
                this.ngOnDestroy()
            } else {
                if (data.code === STATUS.EXIST_ACCOUNT_NUMBER) {
                    this.message.error(MESSAGE.EXIST_ACCOUNT_NUMBER)
                }
                if (data.code === STATUS.EXIST_EMAIL) {
                    this.message.error(MESSAGE.EXIST_EMAIL)
                }
            }
        })
    }
}
