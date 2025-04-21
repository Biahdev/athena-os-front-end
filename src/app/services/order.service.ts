import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Helper} from "../helpers/Helper";
import {OrderList} from "../types/OrderList";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    private baseUrl: string = environment.apiUrl + '/orders';
    private helper: Helper = new Helper();

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get<OrderList>(`${this.baseUrl}`);
    }


    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    /*

    create(product: Product): Observable<Product> {
        return this.http.post<Product>(`${this.baseUrl}`, this.helper.cleanObject(product));
    }

    update(id: number, product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}/${id}`, this.helper.cleanObject(product));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/status`);
    }
    */

}
