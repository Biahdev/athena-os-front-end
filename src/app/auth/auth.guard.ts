import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isUserAuthenticated()) {
        return true;
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
};
