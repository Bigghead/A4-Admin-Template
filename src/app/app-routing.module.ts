import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GalleryComponent } from './homepage/gallery/gallery.component';
import { DashboardComponent } from './homepage/dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin-template',
  },
  { path: 'admin-template', component: HomepageComponent, children: [
    { path: '', component: DashboardComponent },
    { path: 'gallery', component: GalleryComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
