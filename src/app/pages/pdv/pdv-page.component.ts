import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProductListComponent} from "./product-list/product-list.component";
import {CartListComponent} from "./cart-list/cart-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

@Component({
    selector: 'app-pdv-page',
    standalone: true,
    imports: [
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
        MatButton,
        MatIcon,
        ProductListComponent,
        CartListComponent,
        ProductDetailComponent,
        MatIconButton,
    ],
    templateUrl: './pdv-page.component.html',
    styleUrl: './pdv-page.component.scss',
})
export class PdvPageComponent {
    // Highlight first option
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    constructor() {
    }


}
