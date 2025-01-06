import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListEmployeeComponent } from '../component/list-employee/list-employee.component';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  appUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) { }

  getAllEmployee() {
    return this.http.get<Employee[]>(this.appUrl);
  }

  getEmployeeById(empId: number) {
    return this.http.get<Employee>(this.appUrl + '/' + empId);
  }

  saveEmployee(data: Employee) {
    return this.http.post(this.appUrl, data);
  }

  updateEmployee(data: Employee) {
    return this.http.put(this.appUrl + '/' + data.id, data);
  }

  deleteEmployee(empId: number) {
    return this.http.delete(this.appUrl + '/' + empId);
  }

}
