import {Component, Input, OnInit} from '@angular/core';
import {catchError, EMPTY, Observable} from "rxjs";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  @Input()
  category: any;

  categories$: Observable<any> | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {


    this.categories$ = this.productService.categories$
      .pipe(
        catchError(error => {
          console.log('Error ocurred while fetching category List : ', error);
          return EMPTY;
        }));
  }

}
