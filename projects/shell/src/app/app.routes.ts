import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'mfe1', loadComponent: () => loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent) },
  { path: 'mfe2', loadComponent: () => loadRemoteModule('mfe2', './Component').then((m) => m.AppComponent) },
  { path: '**', component: NotFoundComponent },
  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
