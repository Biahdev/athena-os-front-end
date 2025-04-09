import {Component, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButtonModule, MatMiniFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {CustomizerSettingsService} from "../../../customizer-settings/customizer-settings.service";
import {ProductService} from "../../../services/product.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../types/Category";
import {PDVService} from "../../../services/pdv.service";
import {Product} from "../../../types/Product";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [RouterLink, NgApexchartsModule, MatCard, MatCardContent, MatIcon, MatMiniFabButton, MatTooltip, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, CurrencyPipe, NgForOf],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent {


    protected displayedColumns: string[] = ['photo', 'description'];
    protected dataSource = new MatTableDataSource<Product>();
    protected categories: Category[];


    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private pdvService: PDVService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });

        this.categoryService.getAll().subscribe(data => {
            this.categories = data;
        })

        this.productService.getAll().subscribe(data => {
            this.dataSource.data = data;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    productDetail(product: Product) {
        this.pdvService.setData(product);
    }
}

