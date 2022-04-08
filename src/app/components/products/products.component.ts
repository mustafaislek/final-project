import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { ProductsDataSource } from './products-datasource';
import {
  ProductDeleteDialogComponent
} from "../product-delete-dialog/product-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;
  dataSource = new MatTableDataSource<Product>();

  displayedColumns = ['title', 'description','category', 'price','cart'];

  constructor(
    public dialog: MatDialog,
    public productService: ProductService
  ) {
    // this.dataSource = new ProductsDataSource();
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
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
