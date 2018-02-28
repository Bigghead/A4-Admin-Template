import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashHelper } from './dashboard-helper';
import { SharedModule } from '../shared/shared.module';

@NgModule( {
    imports: [ SharedModule ], 
    declarations: [ DashboardComponent ], 
    providers: [ DashHelper ]
} ) 

export class DashboardModule {}