import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './widgets/not-found/not-found.component';
import {CategoryPageComponent} from "./pages/category/category-page.component";
import {DashboardPageComponent} from "./pages/dashboard/dashboard-page.component";
import {EmployeePageComponent} from "./pages/employee/employee-page.component";
import {EmployeeDetailsComponent} from "./pages/employee/details/employee-details.component";
import {ProductCreateComponent} from "./pages/product/create/product-create.component";
import {ProductPageComponent} from "./pages/product/product-page.component";
import {PdvPageComponent} from "./pages/pdv/pdv-page.component";
import {ProductEditComponent} from "./pages/product/edit/product-edit.component";
import {CheckoutComponent} from "./pages/checkout/checkout.component";
import {OrderPageComponent} from "./pages/order/order-page.component";

import {ProductDetailsComponent} from "./pages/product/details/product-details.component";
import {OrderDetailComponent} from "./pages/order/detail/order-detail.component";

import {AuthGuard} from './auth/auth.guard';
import {LogoutComponent} from "./pages/auth/logout/logout.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {AuthenticationComponent} from "./pages/auth/authentication.component";
import {ChangePasswordComponent} from "./pages/settings/change-password/change-password.component";
import {AccountSettingsComponent} from "./pages/settings/account-settings/account-settings.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ClientPageComponent} from "./pages/client/client-page.component";
import {ClientDetailsComponent} from "./pages/client/details/client-details.component";
import {InternalErrorComponent} from "./widgets/internal-error/internal-error.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'internal-error',
        canActivate: [AuthGuard],
        component: InternalErrorComponent
    },
    {
        path: 'auth',
        component: AuthenticationComponent,
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'logout', component: LogoutComponent},
        ]
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardPageComponent
    },
    {
        path: 'clients',
        canActivate: [AuthGuard],
        component: ClientPageComponent,
    },
    {
        path: 'clients/detail/:clientId',
        canActivate: [AuthGuard],
        component: ClientDetailsComponent,
    },

    {
        path: 'categories',
        canActivate: [AuthGuard],
        component: CategoryPageComponent
    },
    {
        path: 'employees',
        canActivate: [AuthGuard],
        component: EmployeePageComponent
    },
    {
        path: 'pdv',
        canActivate: [AuthGuard],
        component: PdvPageComponent
    },
    {
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutComponent
    },
    {
        path: 'employees/detail/:employeeId',
        canActivate: [AuthGuard],
        component: EmployeeDetailsComponent
    },
    {
        path: 'orders',
        canActivate: [AuthGuard],
        component: OrderPageComponent
    },
    {
        path: 'orders/detail/:orderId',
        canActivate: [AuthGuard],
        component: OrderDetailComponent
    },
    {
        path: 'products',
        canActivate: [AuthGuard],
        component: ProductPageComponent
    },
    {
        path: 'products/create',
        canActivate: [AuthGuard],
        component: ProductCreateComponent
    },
    {
        path: 'products/edit/:productId',
        canActivate: [AuthGuard],
        component: ProductEditComponent
    },
    {
        path: 'products/detail/:productId',
        canActivate: [AuthGuard],
        component: ProductDetailsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
        ]
    },
    {path: '**', canActivate: [AuthGuard], component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
