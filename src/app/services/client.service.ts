import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Client} from "../types/Client";
import {Helper} from "../helpers/Helper";

@Injectable({
    providedIn: 'root',
})
export class ClientService {

    private baseUrl = environment.apiUrl + 'clients';
    private helper: Helper = new Helper();

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(client: Client): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, this.helper.cleanObject(client));
    }

    update(id: number, client: Client): Observable<Object> {
        return this.http.put(`${this.baseUrl}/${id}`, this.helper.cleanObject(client));
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    getStatus(): Observable<any> {
        return this.http.get(`${this.baseUrl}/status`);
    }
}
