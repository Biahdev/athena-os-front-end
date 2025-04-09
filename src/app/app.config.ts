import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideEnvironmentNgxMask} from "ngx-mask";
import {AuthInterceptor} from "./auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideClientHydration(),
        provideAnimationsAsync(),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideEnvironmentNgxMask(),
        provideHttpClient(withInterceptors([AuthInterceptor])),
    ],
};
