import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MFE2',
    children: [
      { path: 'page1', component: Page1Component, title: 'MFE2 | Page 1' },
      { path: 'page2', component: Page2Component, title: 'MFE2 | Page 2' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
