import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { DashHelper } from './homepage/dashboard/dashboard-helper';
import { GalleryComponent } from './homepage/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ DashHelper ],
  bootstrap: [AppComponent]
})
export class AppModule { }
