import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {CommonModule} from "@angular/common";
import {CategoryService} from "../../../services/category.service";

@Component({
    selector: 'category-create-dialog',
    templateUrl: 'category-create-dialog.component.html',
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
export class CategoryCreateDialog {
    createCategoryForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CategoryCreateDialog>,
        private categoryService: CategoryService,
        private fb: FormBuilder,
    ) {
        this.createCategoryForm = this.fb.group({
            name: ['', [Validators.required]],
            status: ['ATIVO', Validators.required],
        });
    }

    ngOnInit() {}

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if(this.createCategoryForm.valid) {
            this.categoryService.create(this.createCategoryForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }
}
