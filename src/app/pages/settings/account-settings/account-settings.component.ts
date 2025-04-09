import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {RouterLink} from '@angular/router';
import {FileUploadModule} from '@iplab/ngx-file-upload';
import {CustomizerSettingsService} from '../../../customizer-settings/customizer-settings.service';

@Component({
    selector: 'app-account-settings',
    standalone: true,
    imports: [RouterLink, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, FileUploadModule],
    templateUrl: './account-settings.component.html',
    styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

    }

    /*
        ngOnInit(): void {
            this.categoryService.getAll().subscribe(data => {
                this.dataSource.data = data;
            });
        }
     */

}
