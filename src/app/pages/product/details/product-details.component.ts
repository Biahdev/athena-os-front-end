import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CustomizerSettingsService} from '../../../customizer-settings/customizer-settings.service';
import {NgxMaskPipe} from "ngx-mask";
import {MatIcon} from "@angular/material/icon";
import {Employee} from "../../../types/Employee";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../types/Product";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MiniCardComponent} from "../../../widgets/mini-card/mini-card.component";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {Option} from "../../../types/Option";

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, NgOptimizedImage, NgxMaskPipe, MatIcon, MatTab, MatTabGroup, MiniCardComponent, CarouselModule, NgForOf],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
    protected data: Product;
    protected isToggled = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public themeService: CustomizerSettingsService,
        private productService: ProductService,
        private route: ActivatedRoute,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const productId = Number(params.get('productId'));
            this.productService.getById(productId).subscribe(data => {
                this.data = data;
            });
        });
    }

    // With Dots Controls
    imageSlides2: OwlOptions = {
        items: 1,
        nav: false,
        loop: true,
        margin: 25,
        dots: true,
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        autoplayHoverPause: true,
        navText: [
            "<i class='flaticon-chevron-1'></i>",
            "<i class='flaticon-chevron'></i>",
        ],
    }

    showOptionsValue(element: Option) {
        //TODO:  PASSAR ISSO PARA UM HELPER
        return element.values.map(value => value.name).join(', ');
    }

}

