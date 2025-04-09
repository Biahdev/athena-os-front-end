import {Product} from "./Product";

export interface Cart {
    totalValueCart: number;
    totalDiscontValue: number;
    products: Product[];

}