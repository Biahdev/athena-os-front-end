import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly baseUrl = environment.apiUrl + 'auth';
    private readonly userMeUrl = `${environment.apiUrl}users/me`;
    private readonly STORAGE_AUTH_KEY = "userAuthenticated";
    private readonly STORAGE_USER_ROLE = "userRole";

    constructor(private readonly http: HttpClient) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, {email: email, password: password}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this.setUserAuthenticated(true);
                this.fetchUserData();
            })
        );
    }

    logout() {
        this.setUserAuthenticated(false);
        this.http.post(`${this.baseUrl}/logout`, {})
    }

    private fetchUserData() {
        console.debug(this.userMeUrl)
        this.http.get<any>(this.userMeUrl, {
            withCredentials: true
        }).subscribe({
            next: (userData) => {
                console.log(userData);
                this.setUserRoles([userData.role[0].name, userData.role[1].name]);
            },
            error: (error) => {
                console.error('Erro ao buscar dados do usuário:', error);
                console.error(error.message);
                this.logout();
            }
        });
    }

    isUserAuthenticated(): boolean {
        return localStorage.getItem(this.STORAGE_AUTH_KEY) === 'true';
    }

    setUserAuthenticated(status: boolean): void {
        localStorage.setItem(this.STORAGE_AUTH_KEY, status.toString());
    }

    getUserRoles(): string {
        let roles = localStorage.getItem(this.STORAGE_USER_ROLE);

        if (roles == '' || roles == null) {
            this.logout();
        }

        return <string>roles;
    }

    setUserRoles(roles: Array<string>): void {
        localStorage.setItem(this.STORAGE_USER_ROLE, roles.join());
    }

    hasAnyRole(roles: Array<string>) {
        let userRoles = this.getUserRoles();
        return roles.some(role => userRoles.includes(role));
    }


}
