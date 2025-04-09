import {Component, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {NgxMaskPipe} from "ngx-mask";
import {CustomizerSettingsService} from "../../customizer-settings/customizer-settings.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../services/product.service";
import {Product} from "../../types/Product";

@Component({
    selector: 'app-product-page',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, MatIcon, MatSort, MatSortHeader, NgxMaskPipe, CurrencyPipe],
    templateUrl: './product-page.component.html',
    styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
    protected displayedColumns: string[] = ['productId','name', 'category', 'costValue', 'salesValue', 'status', 'action'];
    protected dataSource = new MatTableDataSource<Product>([]);

    protected error: boolean = false;
    protected errorMessage: string;
    protected success: boolean = false;
    protected successMessage: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        private productService: ProductService,
    ) {
    }

    ngOnInit(): void {
        this.productService.getAll().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    dismissAlert(type: string) {
        if(type == 'sucess') {
            this.success = false;
        } else {
            this.error = false;
        }
    }

    successAlert(msg: string) {
        this.successMessage = msg;
        this.success = true;
        setTimeout(() => this.success = false, 10000);
    }

    errorAlert(msg: string) {
        this.errorMessage = msg;
        this.error = true;
        setTimeout(() => this.error = false, 10000);
    }
}