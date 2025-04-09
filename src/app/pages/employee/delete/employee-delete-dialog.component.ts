import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../types/Client";
import {Employee} from "../../../types/Employee";
import {EmployeeService} from "../../../services/employee.service";

@Component({
    selector: 'employee-delete-dialog',
    templateUrl: 'employee-delete-dialog.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class EmployeeDeleteDialog {
    constructor(
        public dialogRef: MatDialogRef<EmployeeDeleteDialog>,
        @Inject(MAT_DIALOG_DATA) protected data: Employee,
        private employeeService: EmployeeService,
    ) {
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.employeeService.delete(this.data.employeeId).subscribe(data => {
            this.dialogRef.close('deleted');
        });
    }

}
