import { createAction, props } from "@ngrx/store";
import { Employee } from "../model/employee";

export const LOAD_EMPLOYEE = '[employee] getAllDetails';
export const LOAD_EMPLOYEE_SUCCESS = 'employee getAllDetails success';
export const LOAD_EMPLOYEE_FAIL = 'employee getAllDetails fail';

export const ADD_EMPLOYEE = '[employee] add';
export const ADD_EMPLOYEE_SUCCESS = '[employee] add success';

export const UPDATE_EMPLOYEE = '[employee] update';
export const UPDATE_EMPLOYEE_SUCCESS = '[employee] update success';

export const GET_EMPLOYEE = '[employee] get employee';

export const DELETE_EMPLOYEE = '[employee] delete';
export const DELETE_EMPLOYEE_SUCCESS = '[employee] delete success';

export const loadEmployee = createAction(LOAD_EMPLOYEE);
export const loadEmployeeSuccess = createAction(LOAD_EMPLOYEE_SUCCESS, props<{ list: Employee[] }>())
export const loadEmployeeFail = createAction(LOAD_EMPLOYEE_FAIL, props<{ errorMssg: string }>());

export const addEmployee = createAction(ADD_EMPLOYEE, props<{ data: Employee }>())
export const addEmployeeSucess = createAction(ADD_EMPLOYEE_SUCCESS, props<{ data: Employee }>())

export const updateEmployee = createAction(UPDATE_EMPLOYEE, props<{ data: Employee }>())
export const updateEmployeeSucess = createAction(UPDATE_EMPLOYEE_SUCCESS, props<{ data: Employee }>())

export const getEmployee = createAction(GET_EMPLOYEE, props<{ empId: number }>())

export const deleteEmployee = createAction(DELETE_EMPLOYEE, props<{ empId: number }>());
export const deleteEmployeeSuccess = createAction(DELETE_EMPLOYEE_SUCCESS, props<{ empId: number }>());



export const emptyAction = createAction('empty');