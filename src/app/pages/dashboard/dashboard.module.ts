import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LinksListComponent } from 'src/app/components/links-list/links-list.component';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';
import { HeaderModule } from 'src/app/components/header/header.module';


@NgModule({
  declarations: [
    DashboardComponent,
    LinksListComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    HeaderModule
  ]
})
export class DashboardModule { }
