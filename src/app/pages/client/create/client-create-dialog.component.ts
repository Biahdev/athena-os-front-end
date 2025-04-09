import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule} from "@angular/common";
import {ClientService} from "../../../services/client.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgxMaskDirective} from "ngx-mask";

@Component({
    selector: 'client-create-dialog',
    templateUrl: 'client-create-dialog.component.html',
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
export class ClientCreateDialog {
    createClientForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<ClientCreateDialog>,
        private clientService: ClientService,
        private fb: FormBuilder,
    ) {
        this.createClientForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            address: ['', [Validators.minLength(3), Validators.maxLength(100)]],
            status: ['REGULAR'],
            phone: ['', [Validators.minLength(12)]],
            whatsapp: ['true'],
            instagram: ['', [Validators.minLength(3), Validators.maxLength(50)]],
        });
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if(this.createClientForm.valid) {
            this.clientService.create(this.createClientForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }
}
