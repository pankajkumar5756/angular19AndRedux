import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmployeeService } from "../service/employee.service";
import { addEmployee, addEmployeeSucess, deleteEmployee, deleteEmployeeSuccess, emptyAction, loadEmployee, loadEmployeeFail, loadEmployeeSuccess, updateEmployee, updateEmployeeSucess } from "./Employee.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class EmployeeEffects {

    // constructor(private action$: Actions, private service: EmployeeService) { }

    action$ = inject(Actions);
    service = inject(EmployeeService);
    toastr = inject(ToastrService);

    _loadEmployee = createEffect(() =>
        this.action$.pipe(
            ofType(loadEmployee),
            exhaustMap(() => {
                return this.service.getAllEmployee().pipe(
                    map((data) => {
                        return loadEmployeeSuccess({ list: data })
                    }),
                    catchError((err) => of(loadEmployeeFail({ errorMssg: err.message })))
                )
            })
        )

    )

    _deleteEmployee = createEffect(() =>
        this.action$.pipe(
            ofType(deleteEmployee),
            switchMap((action) => {
                return this.service.deleteEmployee(action.empId).pipe(
                    switchMap((data) => {
                        return of(deleteEmployeeSuccess({ empId: action.empId }),
                            this.showAlert('Deleted Successfully', 'pass')
                        )
                    }),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            })
        )

    )

    _addEmployee = createEffect(() =>
        this.action$.pipe(
            ofType(addEmployee),
            switchMap((action) => {
                return this.service.saveEmployee(action.data).pipe(
                    switchMap((data) => {
                        return of(addEmployeeSucess({ data: action.data }),
                            this.showAlert('Created Successfully', 'pass')
                        )
                    }),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            })
        )

    )
    _updateEmployee = createEffect(() =>
        this.action$.pipe(
            ofType(updateEmployee),
            switchMap((action) => {
                return this.service.updateEmployee(action.data).pipe(
                    switchMap((data) => {
                        return of(updateEmployeeSucess({ data: action.data }),
                            this.showAlert('Updeated Successfully', 'pass')
                        )
                    }),
                    catchError((err) => of(this.showAlert(err.message, 'fail')))
                )
            })
        )

    )

    showAlert(message: string, response: string) {

        if (response == 'pass') {
            this.toastr.success(message);
        } else {
            this.toastr.error(message);
        }
        return emptyAction();

    }

}