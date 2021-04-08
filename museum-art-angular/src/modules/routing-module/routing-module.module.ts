import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from 'src/app/pages/edit-item/edit-item.component';
import { PreviewComponent } from 'src/app/pages/preview/preview.component';

const routes: Routes = [
 
  {
    path: 'item/:id/edit',
    component: EditItemComponent
  },
  {
    path: 'item/:id',
    component: PreviewComponent
  }
]

export const routing = RouterModule.forRoot(routes)
