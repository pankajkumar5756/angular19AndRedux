import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateValidatorService } from '../../service/date-validator.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-employee',
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;

  title = 'Add Employee';
  dialogeData: any;
  isEdit = false;
  // minDate: Date;

  roles = [
    { id: 1, roleName: 'Admin' },
    { id: 2, roleName: 'Project Manager' },
    { id: 3, roleName: 'Team Lead' },
    { id: 4, roleName: 'Software Developer' },
    { id: 5, roleName: 'Software Tester' },
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog, private datePipe: DatePipe,
    private service: EmployeeService, private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    // this.minDate = new Date();
    this.form = this.fb.group({
      id: ['',],
      name: ['', [Validators.required]],
      dateOfJoining: ['', [Validators.required, DateValidatorService.dateValidator()]],
      role: ['', [Validators.required]],
      salary: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.dialogeData = this.data;
    if (this.dialogeData.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit=true;
      this.service.getEmployeeById(this.dialogeData.code).subscribe(item => {
        let datas = item;
        if (datas != null) {
          const dateOfJoining = new Date(datas.dateOfJoining);
          this.form.setValue({
            id: datas.id,
            name: datas.name,
            dateOfJoining:dateOfJoining,
            salary: datas.salary,
            role: datas.role
          })
        }
      })
    }
  }

  saveEmployee() {
    if (this.form.valid) {
      console.log("Eployee data", this.form.value);

      const formattedDateOfJoining = this.datePipe.transform(this.form.value.dateOfJoining, 'dd-MMM-yyyy');


      const formData: Employee = {
        id: this.form.value.id,
        name: this.form.value.name,
        // dateOfJoining: this.form.value.dateOfJoining, 
        dateOfJoining: formattedDateOfJoining?.toString()!, 
        role: this.form.value.role,
        salary: this.form.value.salary
      }

      if(this.isEdit){

        this.service.updateEmployee(formData).subscribe({
          next: (response) => {
            this.toastr.success('Your Details Add successfully', 'Updated');
            console.log('Employee saved successfully', response);
            this.close();
          },
          error: (err) => {
            console.error('Error saving employee', err);
          }
  
        });

      }else{

        this.service.saveEmployee(formData).subscribe({
          next: (response) => {
            this.toastr.success('Your Details Add successfully', 'Created');
            console.log('Employee saved successfully', response);
            this.close();
          },
          error: (err) => {
            console.error('Error saving employee', err);
          }
  
        });
      }
    }
    else {
      console.log("form data is invalid");

    }
  }

 

  close() {
    this.ref.close();
  }

}
