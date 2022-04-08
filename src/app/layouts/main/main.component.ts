import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import {Product} from "../../models/product";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // isLoading!: boolean;
  category: any;
  products: any;
  isListView: boolean = false

  filteredProducts!: Product[];
  searchItem!: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public authService: AuthService
  ) {
   }

  ngOnInit(): void {

    this.productService.getAllProducts().pipe(switchMap(
      (data:any) => {
        this.products = data
        this.filteredProducts = data;
        return this.route.queryParams;
      }
    )).subscribe((params: any) => {
      console.log('param', params);
      this.category = params.category;
      this.searchItem = params.item;
      this.filterProductData();
    })

  }

  changeView(data: any) {
    if (data === 'card') {
      this.isListView = false
    } else if( data === 'list') {
      this.isListView = true
    }
    console.log('changeView', this.isListView);

  }

  filterProductData() {
    // const filteredData = this.filteredProducts.filter(b => b.price <= this.priceRange).slice();
    const filteredData = this.filteredProducts

    // todo: category eklenecek
    if (this.category) {
      this.products = filteredData.filter((b:any) => b.category.toLowerCase() === this.category.toLowerCase());
    } else if (this.searchItem) {
      this.products = filteredData.filter(b => b.title.toLowerCase().indexOf(this.searchItem) !== -1
        || b.description.toLowerCase().indexOf(this.searchItem) !== -1);
    } else {
      this.products = filteredData;
    }
    // this.isLoading = false;
  }



}
