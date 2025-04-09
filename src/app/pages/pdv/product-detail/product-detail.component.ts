import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {CustomizerSettingsService} from "../../../customizer-settings/customizer-settings.service";
import {CurrencyPipe, NgClass, NgFor, NgIf} from "@angular/common";
import {CarouselModule} from "ngx-owl-carousel-o";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {PDVService} from "../../../services/pdv.service";
import {Product} from "../../../types/Product";

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [RouterLink, NgApexchartsModule, MatCard, MatCardContent, RouterLink, MatCardModule, MatMenuModule, MatButtonModule, CarouselModule, NgFor, NgClass, FormsModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule, MatProgressBarModule, MatButtonToggle, MatButtonToggleGroup, CurrencyPipe, NgIf],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
    protected produto: Product;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private pdvService: PDVService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit() {
        this.pdvService.currentProductDetail.subscribe(data => this.produto = data)
    }

    addProductToCard(product: Product) {
        this.produto = {...product, productQtd: this.qtdProduct};
        this.pdvService.addProductCart(this.produto);
        this.qtdProduct = 1;
    }

    // Input Counter
    protected qtdProduct = 1;

    increment() {
        this.qtdProduct++;
    }

    decrement() {
        if(this.qtdProduct > 1) {
            this.qtdProduct--;
        }
    }

    // Product Images
    productImages = [
        {
            url: 'images/products/product-details1.jpg',
        },
        {
            url: 'images/products/product-details2.jpg',
        },
        {
            url: 'images/products/product-details3.jpg',
        },
        {
            url: 'images/products/product-details4.jpg',
        },
    ]


}
