import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', title: 'Shell' },
  { path: 'mfe1', loadComponent: () => loadRemoteModule('mfe1', './Component').then((m) => m.AppComponent), title: 'MFE 1' },
  { path: 'mfe2', loadChildren: () => loadRemoteModule('mfe2', './Module').then((m) => m.MainModule), title: 'MFE 2' },
  { path: 'mfe3', loadChildren: () => loadRemoteModule('mfe3', './Module').then((m) => m.MainModule), title: 'MFE 3 ext.' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' },
  // DO NOT insert routes after this one.
  // { path:'**', ...} needs to be the LAST one.
];
