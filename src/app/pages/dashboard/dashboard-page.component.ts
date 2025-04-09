import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatCard, MatCardContent} from "@angular/material/card";

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [RouterLink, NgApexchartsModule, MatCard, MatCardContent],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {}
