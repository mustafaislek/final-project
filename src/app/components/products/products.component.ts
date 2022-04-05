import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsDataSource } from './products-datasource';
import {
  ProductDeleteDialogComponent
} from "../product-delete-dialog/product-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource: ProductsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'description', 'price','cart', 'view', 'edit', 'delete',];

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new ProductsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(ProductDeleteDialogComponent);
    dialogRef.componentInstance.product = product;

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.event === 'delete') {
        // this.loadPage();
      }
    });
  }

}
