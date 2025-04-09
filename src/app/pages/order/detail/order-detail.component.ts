import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CustomizerSettingsService} from '../../../customizer-settings/customizer-settings.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../types/Order";
import {CurrencyPipe, DatePipe, NgForOf, TitleCasePipe} from "@angular/common";
import {OrderProduct} from "../../../types/OrderProduct";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-e-order-tracking',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatTabGroup, MatTab, MatIcon, MatTabLabel, DatePipe, TitleCasePipe, CurrencyPipe, NgForOf],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss',
})
export class OrderDetailComponent {

    // isToggled
    isToggled = false;
    displayedColumns: string[] = ['name', 'description', 'quantity', 'discount', 'extraPrice', 'finalUnit', 'finalTotal'];
    dataProducts = new MatTableDataSource<OrderProduct>([]);
    data: Order;

    constructor(
        public themeService: CustomizerSettingsService,
        private orderService: OrderService,
        private route: ActivatedRoute,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const orderId = Number(params.get('orderId'));
            this.orderService.getById(orderId).subscribe(data => {
                this.data = data;
                this.dataProducts = data.products
            });
        });
    }

    showOptionsValue(element: any) {
        return element.values.map((value: {name: string;}) => value.name).join(', ');
    }


}
