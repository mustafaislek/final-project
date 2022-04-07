import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {SubscriptionService} from "../../services/subscription.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public products!: Product[];
  searchControl = new FormControl();
  filteredProducts!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private router: Router,
    private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadProductData();
    this.setSearchControlValue();
    this.filterProductData();
  }

  searchStore(event: any) {
    const searchItem = this.searchControl.value;
    // console.log(searchItem);
    if (searchItem !== '') {
      this.router.navigate(['/search'], {
        queryParams: {
          item: searchItem.toLowerCase()
        }
      });
    }
  }

  cancelSearch(){
    this.router.navigate(['/']);
  }

  private loadProductData() {
    this.productService.products$.subscribe(
      (data: any) => {
        this.products = data;
      }
    );
  }

  private setSearchControlValue() {
    this.subscriptionService.searchItemValue$.subscribe(
      data => {
        if (data) {
          this.searchControl.setValue(data);
        } else {
          this.searchControl.setValue('');
        }
      }
    );
  }

  private filterProductData() {
    this.filteredProducts = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.products?.filter(option => option.title.toLowerCase().includes(filterValue)
      || option.description.toLowerCase().includes(filterValue));
  }

}
