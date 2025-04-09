import {Component, DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import {CommonModule, registerLocaleData, ViewportScroller} from '@angular/common';
import {Event, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './widgets/sidebar/sidebar.component';
import {HeaderComponent} from './widgets/header/header.component';
import {FooterComponent} from './widgets/footer/footer.component';
import {CustomizerSettingsService} from './customizer-settings/customizer-settings.service';
import {ToggleService} from './widgets/sidebar/toggle.service';
import ptBr from '@angular/common/locales/pt';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {HttpClient} from "@angular/common/http";

registerLocaleData(ptBr);

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        {provide: LOCALE_ID, useValue: 'pt'},
        {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'DD/MM/YYYY',
                },
                display: {
                    dateInput: 'DD/MM/YYYY',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'DD/MM/YYYY',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            },
        },
    ],
})
export class AppComponent {

    // Title
    title = 'Athena';

    // isSidebarToggled
    isSidebarToggled = false;

    // isToggled
    isToggled = false;

    constructor(
        public router: Router,
        private toggleService: ToggleService,
        private viewportScroller: ViewportScroller,
        public themeService: CustomizerSettingsService,
        private http: HttpClient
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.viewportScroller.scrollToPosition([0, 0]);
            }
        });
        this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
            this.isSidebarToggled = isSidebarToggled;
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

}
