import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from "@angular/common";
import {EmployeeService} from "../../../services/employee.service";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
    selector: 'employee-create-dialog',
    templateUrl: 'employee-create-dialog.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatSelect,
        MatOption,
        ReactiveFormsModule,
    ],
})
export class EmployeeCreateDialog {
    protected createEmployeeForm: FormGroup;
    protected positions: string[] = [];

    constructor(
        protected dialogRef: MatDialogRef<EmployeeCreateDialog>,
        private employeeService: EmployeeService,
        private fb: FormBuilder,
    ) {
        this.createEmployeeForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['', Validators.required],
            position: ['', Validators.required],
            status: ['ATIVO', Validators.required],
            note: [''],
        });
    }

    ngOnInit() {
        //  this.employeeService.getPositions().subscribe(data => {
        //      this.positions = data;
        //  });
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.createEmployeeForm.valid) {
            this.employeeService.create(this.createEmployeeForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }
}
