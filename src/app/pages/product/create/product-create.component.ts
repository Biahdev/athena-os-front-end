import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {Router, RouterLink} from '@angular/router';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {Editor, NgxEditorModule, Toolbar} from 'ngx-editor';
import {CdkListbox, CdkOption} from "@angular/cdk/listbox";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipListbox, MatChipOption, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../types/Category";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../../services/product.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {OptionValue} from "../../../types/OptionValue";
import {MatDialog} from "@angular/material/dialog";
import {OptionValueEditDialog} from "../option-value-edit-dialog/option-value-edit-dialog.component";
import {CurrencyMaskModule} from 'ng2-currency-mask';

@Component({
    selector: 'app-product-create',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FileUploadModule, NgxEditorModule, CdkListbox, CdkOption, MatChipListbox, MatChipOption, MatButtonToggleGroup, MatButtonToggle, MatChipRow, MatChipGrid, MatChipInput, MatIcon, MatTooltip, NgForOf, CurrencyPipe, MatChipRemove, CurrencyMaskModule, NgIf],
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {

    @ViewChild('optionsContainer', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;

    public createProductForm: FormGroup;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    protected categories: Category[];

    // Editor
    protected editor: Editor;
    protected toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}],
        ['text_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    constructor(
        private categoryService: CategoryService,
        private productService: ProductService,
        public fb: FormBuilder,
        protected dialog: MatDialog,
        private router: Router,
    ) {
        this.createProductForm = this.fb.group({
                name: ['', [Validators.required]],
                status: ['REGULAR', [Validators.required]],
                description: [''],
                categoryId: ['', [Validators.required]],
                costValue: [''],
                salesValue: ['', [Validators.required]],
                options: this.fb.array([]),
            },
        )
    }

    ngOnInit(): void {
        this.editor = new Editor();
        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
        });
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    onSubmit(): void {
        console.log(this.createProductForm.value)
        this.productService.create(this.createProductForm.value).subscribe(data => {
            this.router.navigate(['/product/edit/' + data.productId], {replaceUrl: true})
        })
    }

    options() {
        return this.createProductForm.get('options') as FormArray;
    }

    newOption() {
        const optionGroup = this.fb.group({
            title: [''],
            type: [''],
            values: this.fb.array([]),
        });
        this.options().push(optionGroup);
    }

    removeOption(index: number) {
        this.options().removeAt(index);
    }


    optionsValues(i: number): FormArray {
        return this.options().at(i).get("values") as FormArray
    }

    newOptionValue(event: MatChipInputEvent, i: number): void {
        const value = (event.value || '').trim();
        const optionValueGroup =
            this.fb.group({
                name: value,
                price: 0.0,
            });

        if(value) this.optionsValues(i).push(optionValueGroup);
        event.chipInput!.clear();
    }

    removeOptionValue(option: number, chip: number): void {
        this.optionsValues(option).removeAt(chip);
    }

    editOptionValue(option: number, chip: number, initial: {name: any; price: any;}) {
        const dialogRef = this.dialog.open(OptionValueEditDialog, {
            data: {name: initial.name, price: initial.price},
        });

        dialogRef.afterClosed().subscribe((result: OptionValue) => {
            if(result) {
                this.optionsValues(option).at(chip).patchValue({
                    name: result.name,
                    price: result.price,
                })
            }
        });
    }
}
