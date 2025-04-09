import {Component, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgApexchartsModule} from "ng-apexcharts";
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {CustomizerSettingsService} from "../../../customizer-settings/customizer-settings.service";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatCell, MatCellDef, MatColumnDef, MatRow, MatRowDef, MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {PDVService} from "../../../services/pdv.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {Product} from "../../../types/Product";
import {FormsModule} from "@angular/forms";
import {Option} from "../../../types/Option";
import {Cart} from "../../../types/Cart";
import {DiscountDialogComponent} from "../discount/discount-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-cart-list',
    standalone: true,
    imports: [RouterLink, NgApexchartsModule, MatCard, MatIconModule, MatCardContent, MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatCell, MatCellDef, MatColumnDef, MatPaginator, MatRow, MatRowDef, MatTable, NgIf, CurrencyPipe, FormsModule, NgForOf],
    templateUrl: './cart-list.component.html',
    styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
    protected displayedColumns: string[] = ['product', 'counterButtons'];
    protected dataSource = new MatTableDataSource<Product>();
    protected cart: Cart;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private pdvService: PDVService,
        public dialog: MatDialog,
        private router: Router
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit() {
        this.pdvService.currentCart.subscribe(data => {
            this.cart = data
            this.dataSource.data = this.cart.products;
        })
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    increment(product: Product) {
        product.productQtd++;
        this.pdvService.setProdutQuantity(product);
    }

    decrement(product: Product) {
        if(product.productQtd > 1) {
            product.productQtd--;
            this.pdvService.setProdutQuantity(product);
        }
    }

    //TODO passar pora um helper
    showOptionsValue(element: Option) {
        return element.values.map(value => value.name).join(', ');
    }

    getTotalValueForProduct(element: Product) {
        return element.salesValue * element.productQtd
    }

    openDiscountDialog(): void {
        const dialogRef = this.dialog.open(DiscountDialogComponent, {
            data: {cart: this.cart},
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result: any) => {
        });
    }

    goToCheckout(){
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.router.navigate(['/checkout']);
    }


}


