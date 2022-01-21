import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../services/guards/login.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () =>
                    import('../pages/home/home.module').then(
                        m => m.HomeModule,
                    ),
            },
            {
                path: 'register',
                loadChildren: () =>
                    import('../pages/register/register.module').then(
                        m => m.RegisterModule,
                    ),
            },
            {
                path: 'login',
                loadChildren: () =>
                    import('../pages/login/login.module').then(
                        m => m.LoginModule,
                    ),
            },
            {
                path: 'dashboard',
                canActivate: [LoginGuard],
                loadChildren: () =>
                    import('../pages/dashboard/dashboard.module').then(
                        m => m.DashboardModule,
                    ),
            }
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
