import {Employee} from '../models/employee-model';
import {PagingModel} from '../models/paging-model';

export class EmployeeResponse {
    customers: Employee[];
    paging: PagingModel;
    sort: string;
    search: string;
}
