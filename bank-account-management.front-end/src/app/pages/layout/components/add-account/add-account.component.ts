import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Employee } from 'src/app/shared/models/employee-model';
import { MyValidationErrors, STATUS } from 'src/app/shared/utils/utils';
import { UtilsValidate } from 'src/app/shared/utils/validate';
import { EmployeeService } from '../../../../shared/services/employee/employee.service';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.component.html',
    styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

    accountForm!: FormGroup;
    selectedGender: string = null;
    account: Employee = new Employee();
    validateGender: string = null;

    constructor(
        private fb: FormBuilder,
        private employeeService: EmployeeService,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.accountForm = this.fb.group({
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
    }

    submitForm(): void {
        for (const i in this.accountForm.controls) {
            this.accountForm.controls[i].markAsDirty();
            this.accountForm.controls[i].updateValueAndValidity();
        }

        if (this.accountForm.valid) {
            let employee = this.getEmployeeFromFormBuilder()
            this.addNewEmployee(employee)
        } else {
            return
        }
    }

    setGender(e) {
        this.selectedGender = e.target.value;
    }

    addNewEmployee(employee: Employee) {
        this.employeeService.addEmployee(employee).subscribe(response => {
            let data: any = response
            if (data.status === STATUS.SUCCESS) {
                this.message.success('Add a new employee seccess!');
                this.accountForm.reset()
                this.accountForm.controls['gender'].setValue('M')
            } else {
                this.message.error(data.msg)
            }
        })
    }

    getEmployeeFromFormBuilder() {
        let account_number = this.accountForm.controls['account_number'].value
        let fisrt_name = this.accountForm.controls['firstname'].value
        let last_name = this.accountForm.controls['lastname'].value
        let age = this.accountForm.controls['age'].value
        let gender = this.accountForm.controls['gender'].value
        let email = this.accountForm.controls['email'].value
        let employer = this.accountForm.controls['employer'].value
        let city = this.accountForm.controls['city'].value
        let state = this.accountForm.controls['state'].value
        let balance = this.accountForm.controls['balance'].value
        let address = this.accountForm.controls['address'].value

        let employeeRegister: Employee = {
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
            address: address,
            _id: null
        }

        return employeeRegister
    }
}
