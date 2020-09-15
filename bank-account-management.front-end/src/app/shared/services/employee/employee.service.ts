import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee-model';
import { SortModel } from '../../models/sort-model';
import { EmployeeResponse } from '../../response/employee-response';
import { API_URL_STRING } from '../../utils/utils';
import { HttpService } from '../http/http.service';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private EMPLOYEE_URL = `${API_URL_STRING}/customer`

    constructor(
        private http: HttpService
    ) {
    }

    getEmployees(params: any, sortModel: SortModel): Observable<EmployeeResponse[]> {
        return this.http.getApiAsync<EmployeeResponse>(this.EMPLOYEE_URL, params, sortModel)
    }

    deleteEmployeeByID(params: string): Observable<EmployeeResponse> {
        return this.http.deleteApiAsync<EmployeeResponse>(this.EMPLOYEE_URL, params)
    }

    addEmployee(employee: Employee): Observable<any> {
        return this.http.postApiAsync<Employee>(this.EMPLOYEE_URL, employee);
    }

    findEmployeeById(params: string): Observable<Employee> {
        return this.http.findByID<Employee>(this.EMPLOYEE_URL, params);
    }

    updateEmployee(account: Employee): Observable<Employee> {
        let url = `${this.EMPLOYEE_URL}/${account._id}`
        return this.http.putApiAsync<Employee>(`${url}`, account);
    }

}
