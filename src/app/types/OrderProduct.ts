import {Option} from "./Option";

export interface OrderProduct {
    orderProductId: number;
    productId: number;
    name: string;
    quantity: number;
    discount: number;
    extraPrice: number;
    initialUnit: number;
    finalUnit: number;
    initialTotal: number;
    finalTotal: number;
    options: Option[];

}