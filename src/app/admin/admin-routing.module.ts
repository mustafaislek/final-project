import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from '../components/admin/products-list/products-list.component';
import { ProductsUpdateComponent } from '../components/admin/products-update/products-update.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'new', component: ProductsUpdateComponent },
      { path: ':id', component: ProductsUpdateComponent },
      { path: '', component: ProductsListComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
