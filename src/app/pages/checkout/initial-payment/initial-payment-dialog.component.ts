import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'initial-payment-dialog',
    templateUrl: 'initial-payment-dialog.component.html',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
})
export class InitialPaymentDialog {

    constructor(
        public dialogRef: MatDialogRef<InitialPaymentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface DialogData {
    animal: string;
    name: string;
}
