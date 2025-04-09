import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgxMaskDirective} from "ngx-mask";
import {EmployeeService} from "../../../services/employee.service";
import {Client} from "../../../types/Client";
import {Employee} from "../../../types/Employee";

@Component({
    selector: 'employee-edit-dialog',
    templateUrl: 'employee-edit-dialog.component.html',
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
        MatCheckbox,
        NgxMaskDirective,
    ],
})
export class EmployeeEditDialog {
    protected editEmployeeForm: FormGroup;
    protected positions: string[] = [];

    constructor(
        public dialogRef: MatDialogRef<EmployeeEditDialog>,
        @Inject(MAT_DIALOG_DATA) protected data: Employee,
        private employeeService: EmployeeService,
        private fb: FormBuilder,
    ) {
        this.editEmployeeForm = this.fb.group({
            employeeId: [this.data.employeeId, Validators.required],
            name: [this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            position: [this.data.position, Validators.required],
            status: [this.data.status, Validators.required],
            note: [this.data.note],
        });
    }

    ngOnInit() {
        this.employeeService.getPositions().subscribe(data => {
            this.positions = data;
        });
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if(this.editEmployeeForm.valid) {
            this.employeeService.update(this.data.employeeId, this.editEmployeeForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }
}
