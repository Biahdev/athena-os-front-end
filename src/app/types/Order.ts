import {Client} from "./Client";
import {Employee} from "./Employee";

export interface Order {
    orderId: number;
    deliveryDate: Date;
    status: string;
    deliveryType: string;
    discountOrder: number;
    discountOrderProducts: number;
    discountTotal: number;
    initialTotal: number;
    finalTotal: number;
    note: string;
    createdAt: string;
    client: Client;
    employee: Employee;
}

