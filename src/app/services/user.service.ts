import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.development";
import {Category} from "../types/Category";
import {CategoryWithCountProduct} from "../types/CategoryWithCountProduct";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private baseUrl = environment.apiUrl + 'users';

    constructor(private http: HttpClient) {
    }

    me(): Observable<any> {
        return this.http.get(`${this.baseUrl}/me`, {})
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(category: Category): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, category);
    }

    update(id: number, category: Category): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, category);
    }

    disable(id: number): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}/disable`, null);
    }

    getStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/status`);
    }
}
