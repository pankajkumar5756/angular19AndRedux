import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../service/employee.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../model/employee';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-list-employee',
  providers:[DatePipe],
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'role', 'date', 'salary', 'actions'];
  dataSource!: MatTableDataSource<Employee>;
  empList: Employee[] = [];
  subscription = new Subscription();

  constructor(private dialog: MatDialog, private service: EmployeeService, private datePipe: DatePipe,) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getAllEmployeeDetails();
  }

  getAllEmployeeDetails() {
    let sub = this.service.getAllEmployee().subscribe(item => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    });
    this.subscription.add(sub);
  }

  addEmployee() {
   this.openPopup(0);
  }

  editEmployee(empId: number) {
    this.openPopup(empId);
  }

  deleteEmployee(empId: number) {
    if (confirm('Are you sure ?')) {
      let sub = this.service.deleteEmployee(empId).subscribe(item => {
        this.getAllEmployeeDetails();
      });
      this.subscription.add(sub);
    }
  }

  openPopup(empId:number){
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data:{
        'code':empId
      }
    }).afterClosed().subscribe(items => {
      this.getAllEmployeeDetails();
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy')!;
  }

}
