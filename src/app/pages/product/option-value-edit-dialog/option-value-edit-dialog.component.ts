import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule} from "@angular/common";
import {OptionValue} from "../../../types/OptionValue";
import {CurrencyMaskModule} from "ng2-currency-mask";

@Component({
    selector: 'option-value-edit-dialog',
    templateUrl: 'option-value-edit-dialog.component.html',
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
        CurrencyMaskModule,
    ],
})
export class OptionValueEditDialog {
    public optionValueForm: FormGroup;

    constructor(
        protected dialogRef: MatDialogRef<OptionValueEditDialog>,
        protected fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) protected data: OptionValue,
    ) {
    }


    ngOnInit() {
        this.optionValueForm = this.fb.group({
            name: [this.data.name],
            price: [this.data.price],
        })
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    update() {
        this.dialogRef.close(this.optionValueForm.value);
    }
}
