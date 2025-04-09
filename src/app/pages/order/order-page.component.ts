import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {RouterLink} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CustomizerSettingsService} from '../../customizer-settings/customizer-settings.service';
import {OrderList} from "../../types/OrderList";
import {OrderService} from "../../services/order.service";

@Component({
    selector: 'app-order-page',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, CurrencyPipe, DatePipe],
    templateUrl: './order-page.component.html',
    styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {
    displayedColumns: string[] = ['orderId', 'employeeName', 'clientName', 'quantity', 'value', 'deliveryDate', 'status', 'action'];
    dataSource = new MatTableDataSource<OrderList>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private orderService: OrderService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.orderService.getAll().subscribe(data => {
            this.dataSource = data;
        })
    }


}