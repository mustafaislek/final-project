import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '../shared/ng-material.module';
import { ProductsUpdateComponent } from '../components/admin/products-update/products-update.component';
import { ProductsDeleteComponent } from '../components/admin/products-delete/products-delete.component';
import { ProductsListComponent } from '../components/admin/products-list/products-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ShortPipe } from 'src/app/shared/short.pipe';

@NgModule({
  declarations: [
    ProductsUpdateComponent,
    ProductsListComponent,
    ProductsDeleteComponent,
    ShortPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgMaterialModule
  ],
  exports: [
    ShortPipe
  ],
  providers: [
    ShortPipe
  ]
})
export class AdminModule { }
