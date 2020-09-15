import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditService {
  private idEmployee = new BehaviorSubject('');
  constructor() { }

  getEmployeeID() {
    return this.idEmployee
  }

  setEmployeeID(value: string) {
    this.idEmployee.next(value)
  }
}
