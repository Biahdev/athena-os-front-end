import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from "../types/Product";
import {Cart} from "../types/Cart";

@Injectable({
    providedIn: 'root',
})
export class PDVService {

    private initialProductDetail = new BehaviorSubject<Product>({
        productId: 0,
        productQtd: 0,
        categoryId: 0,
        categoryName: '',
        name: '',
        description: '',
        costValue: 0,
        salesValue: 0,
        status: '',
        options: [],
    });
    public currentProductDetail = this.initialProductDetail.asObservable();
    private initialCart = new BehaviorSubject<Cart>({totalValueCart: 0, totalDiscontValue: 20, products: []});
    public currentCart = this.initialCart.asObservable()

    constructor() {
    }

    setData(product: Product) {
        this.initialProductDetail.next(product);
    }

    addProductCart(newProduct: Product) {
        const initialProductList = this.initialCart.value.products;
        const productIndex = initialProductList.findIndex(obj => obj.productId === newProduct.productId);

        if(productIndex !== -1) {
            initialProductList[productIndex].productQtd += newProduct.productQtd;
        } else {
            initialProductList.push(newProduct);
        }

        this.setTotalValueCart();

        this.initialCart.next({totalValueCart: this.initialCart.value.totalValueCart, totalDiscontValue: this.initialCart.value.totalDiscontValue, products: [...initialProductList]});
    }

    setProdutQuantity(product: Product) {
        const initialProductList = this.initialCart.value.products;
        const productIndex = initialProductList.findIndex(obj => obj.productId === product.productId);
        initialProductList[productIndex].productQtd = product.productQtd;

        this.setTotalValueCart();

    }

    setTotalValueCart() {
        const total = this.initialCart.value.products.reduce((acumulador, atual) => {
            return acumulador + atual.salesValue * atual.productQtd;
        }, 0);

        this.initialCart.value.totalValueCart = total - this.initialCart.value.totalDiscontValue;
    }

    removeProdutoCart() {

    }


}
