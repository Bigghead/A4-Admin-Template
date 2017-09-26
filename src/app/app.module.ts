import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { DashHelper } from './homepage/dashboard/dashboard-helper';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ DashHelper ],
  bootstrap: [AppComponent]
})
export class AppModule { }
