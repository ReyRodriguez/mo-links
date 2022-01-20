import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { LoginGuard } from '../services/guards/login.guard';
// import { NotLoggedinGuard } from '../services/guards/not-loggedin.guard';

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
                //canActivate: [NotLoggedinGuard],
                loadChildren: () =>
                    import('../pages/register/register.module').then(
                        m => m.RegisterModule,
                    ),
            },
            {
                path: 'login',
                //canActivate: [LoginGuard],
                loadChildren: () =>
                    import('../pages/login/login.module').then(
                        m => m.LoginModule,
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
