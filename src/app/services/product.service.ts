import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Product } from '../models/product';
import {BASE_API_URL} from "../config/api.constants";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  products$ = this.getAllProducts().pipe(shareReplay(1));

  getAllProducts() {
    return this.http.get<Product[]>(`${{BASE_API_URL}}/products`);
  }

  addProduct(product: any) {
    return this.http.post(`${{BASE_API_URL}}/products`, product);
  }

  getProductById(id: number) {
    return this.products$.pipe(map(product => product.find(b => b.productId === id)));
  }

  updateProductDetails(product: any) {
    return this.http.put(`${{BASE_API_URL}}/products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${{BASE_API_URL}}/products` + id);
  }
}
