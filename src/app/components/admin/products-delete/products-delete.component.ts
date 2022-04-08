import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-delete',
  templateUrl: './products-delete.component.html',
  styleUrls: ['./products-delete.component.scss']
})
export class ProductsDeleteComponent implements OnInit {


  productData$!: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<ProductsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: number,
    private productService: ProductService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.productService.deleteProduct(this.productId).subscribe(
      () => {
      }, error => {
        console.log('Error ocurred while fetching product data : ', error);
      });
  }

  ngOnInit() {
    this.fetchProductData();
  }

  fetchProductData() {
    this.productData$ = this.productService.getProductById(this.productId)
      .pipe(
        catchError((error:any) => {
          console.log('Error ocurred while fetching book data : ', error);
          return EMPTY;
        }));
  }

}

