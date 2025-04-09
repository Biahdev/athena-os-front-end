import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {PDVService} from "../../../services/pdv.service";

@Component({
    selector: 'discount-dialog',
    templateUrl: 'discount-dialog.component.html',
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
        MatSelect,
        MatOption,
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        TitleCasePipe,
        MatIcon,
    ],
})
export class DiscountDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DiscountDialogComponent>,
        private pdvService: PDVService,
    ) {
    }

    ngOnInit() {


    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {

    }

}
