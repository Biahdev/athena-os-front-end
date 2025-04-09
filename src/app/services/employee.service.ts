import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.development";
import {Client} from "../types/Client";
import {Helper} from "../helpers/Helper";
import {Employee} from "../types/Employee";

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {

    private baseUrl: string = environment.apiUrl + 'employees';
    private helper: Helper = new Helper();

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(employee: Employee): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, this.helper.cleanObject(employee));
    }

    update(id: number, employee: Employee): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, this.helper.cleanObject(employee));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/status`);
    }

    getPositions(): Observable<any> {
        return this.http.get(`${this.baseUrl}/positions`);
    }
}
