import {Option} from "./Option";

export interface Product {
    productId: number;
    productQtd: number;
    categoryId: number;
    categoryName: string;
    name: string;
    description: string;
    status: string;
    costValue: number;
    salesValue: number;
    options: Option[];
}
