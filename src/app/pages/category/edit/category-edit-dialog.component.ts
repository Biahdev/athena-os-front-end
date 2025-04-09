import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import {Category} from "../../../types/Category";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {CategoryService} from "../../../services/category.service";

@Component({
    selector: 'category-edit-dialog',
    templateUrl: 'category-edit-dialog.component.html',
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
    ],
})
export class CategoryEditDialog {

    editCategoryForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CategoryEditDialog>,
        @Inject(MAT_DIALOG_DATA) protected data: Category,
        private categoryService: CategoryService,
        private fb: FormBuilder,
    ) {
        this.editCategoryForm = this.fb.group({
            categoryId: [data.categoryId, Validators.required],
            name: [data.name, Validators.required],
            status: [data.status, Validators.required],
        })
    }

    ngOnInit() {

    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        if(this.editCategoryForm.valid) {
            this.categoryService.update(this.editCategoryForm.value.categoryId, this.editCategoryForm.value).subscribe(data => {
                this.dialogRef.close(data);
            });
        }
    }

}
