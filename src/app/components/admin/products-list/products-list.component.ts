import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductsDeleteComponent } from '../products-delete/products-delete.component';
import { ShortPipe } from 'src/app/shared/short.pipe';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {


  displayedColumns: string[] = ['id', 'title', 'description', 'category', 'price', 'operation'];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private unsubscribe$ = new Subject<void>();
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBarService: SnackbarService,
    private shortPipe: ShortPipe) {
  }

  ngOnInit() {
    this.getAllProductData();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProductData() {
    this.productService.getAllProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: any) => {
        // console.log(data);

        this.dataSource.data = data
      }, error => {
        console.log('Error ocurred while fetching product details : ', error);
      });
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(ProductsDeleteComponent, {
      data: id
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result === 1) {
          this.getAllProductData();
          this.snackBarService.showSnackBar('Data deleted successfully');
        } else {
          this.snackBarService.showSnackBar('Error occurred!! Try again');
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
