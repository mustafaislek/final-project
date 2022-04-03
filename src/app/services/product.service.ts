import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  products$ = this.getAllProducts().pipe(shareReplay(1));

  getAllProducts() {
    return this.http.get<Product[]>(this.baseURL);
  }

  addProduct(product: any) {
    return this.http.post(this.baseURL, product);
  }

  getProductById(id: number) {
    return this.products$.pipe(map(product => product.find(b => b.productId === id)));
  }

  updateProductDetails(product: any) {
    return this.http.put(this.baseURL, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseURL + id);
  }
}
