import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GalleryComponent } from './gallery/gallery.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'gallery', component: GalleryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
