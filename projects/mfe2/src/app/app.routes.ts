import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./main.module').then(m => m.MainModule) }
];
