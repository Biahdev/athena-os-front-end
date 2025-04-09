import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {RouterLink} from '@angular/router';
import {CustomizerSettingsService} from "../../customizer-settings/customizer-settings.service";
import {MatDivider} from "@angular/material/divider";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgxMaskDirective} from "ngx-mask";
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {AsyncPipe} from "@angular/common";
import {map, Observable, startWith} from "rxjs";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatStep, MatStepLabel, MatStepper, MatStepperIcon, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatIcon} from "@angular/material/icon";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatDialog} from "@angular/material/dialog";
import {InitialPaymentDialog} from "./initial-payment/initial-payment-dialog.component";

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, MatDivider, MatRadioButton, MatRadioGroup, NgxMaskDirective, MatAutocomplete, AsyncPipe, MatAutocompleteTrigger, MatCheckbox, MatStep, MatStepLabel, MatStepperPrevious, MatStepperNext, MatStepper, MatIcon, MatStepperIcon],
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    providers: [{
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false},
    }],
})
export class CheckoutComponent {

    protected cart: any;
    myControl = new FormControl('');
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    // Basic Dialog
    animal: string;
    name: string;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private dateAdapter: DateAdapter<Date>,
        private _formBuilder: FormBuilder,
        public dialog: MatDialog,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.dateAdapter.setLocale('pt-BR');
    }

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });

    ngOnInit(): void {
        let cartLocalStorage = localStorage.getItem('cart')
        this.cart = cartLocalStorage ? JSON.parse(cartLocalStorage) : '';
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(InitialPaymentDialog, {
            data: {name: this.name, animal: this.animal},
        });
        dialogRef.afterClosed().subscribe(result => {
            this.animal = result;
        });
    }
}
