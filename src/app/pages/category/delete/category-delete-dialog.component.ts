import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {Category} from "../../../types/Category";
import {CategoryService} from "../../../services/category.service";

@Component({
    selector: 'category-delete-dialog',
    templateUrl: 'category-delete-dialog.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ]
})
export class CategoryDeleteDialog {

    constructor(
        public dialogRef: MatDialogRef<CategoryDeleteDialog>,
        private categoryService: CategoryService,
        @Inject(MAT_DIALOG_DATA) protected data: Category,
    ) {
    }

    onNoClick(event: Event): void {
            event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.categoryService.disable(this.data.categoryId).subscribe( _ => {
            this.dialogRef.close('deleted');
        });
    }


}
