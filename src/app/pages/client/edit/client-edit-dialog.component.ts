import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule} from "@angular/common";
import {CategoryService} from "../../../services/category.service";
import {ClientService} from "../../../services/client.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {NgxMaskDirective} from "ngx-mask";
import {Category} from "../../../types/Category";
import {Client} from "../../../types/Client";

@Component({
    selector: 'client-create-dialog',
    templateUrl: 'client-edit-dialog.component.html',
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
export class ClientEditDialog {
    updateClientForm: FormGroup;
    listStatus: string[] = [];

    constructor(
        public dialogRef: MatDialogRef<ClientEditDialog>,
        private clientService: ClientService,
        @Inject(MAT_DIALOG_DATA) protected data: Client,
        private fb: FormBuilder,
    ) {
        this.updateClientForm = this.fb.group({
            clientId: [data.clientId],
            name: [data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            address: [data.address, [Validators.minLength(3), Validators.maxLength(100)]],
            status: [data.status],
            phone: [data.phone, [Validators.minLength(12)]],
            whatsapp: [data.whatsapp],
            instagram: [data.instagram, [Validators.minLength(3), Validators.maxLength(50)]],
        });
    }

    ngOnInit(): void {
        this.clientService.getStatus().subscribe(data => {
            this.listStatus = data;
        });
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if(this.updateClientForm.valid) {
            this.clientService.update(this.updateClientForm.value.clientId, this.updateClientForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }
}
