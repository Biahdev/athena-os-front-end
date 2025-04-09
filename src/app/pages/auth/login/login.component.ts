import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomizerSettingsService} from '../../../customizer-settings/customizer-settings.service';
import {AuthService} from "../../../auth/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    isToggled = false;
    hide = true;
    authForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly authService: AuthService,
        public themeService: CustomizerSettingsService
    ) {
        this.authForm = this.fb.group({
            email: ['admin@admin.com.br', [Validators.required, Validators.email]],
            password: ['123', [Validators.required, Validators.minLength(2)]],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    onSubmit() {
        if (this.authForm.valid) {
            const email = this.authForm.value.email;
            const password = this.authForm.value.password;

            this.authService.login(email, password).subscribe({
                next: () => {
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    console.error('Erro no login:', error);
                }
            });
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

}
