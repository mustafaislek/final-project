import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";

@Component({
  templateUrl: './product-delete-dialog.component.html',
})
export class ProductDeleteDialogComponent {
  product?: Product;

  constructor(protected productService: ProductService, protected dialogRef: MatDialogRef<ProductDeleteDialogComponent>) {}

  confirmDelete(id: any): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.dialogRef.close({ event: 'delete' });
    });
  }
}
