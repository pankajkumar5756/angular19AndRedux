import { Employee } from "../model/employee";

export interface EmployeeModel {
    list: Employee[],
    errorMessage: string;

    empObj: Employee
}