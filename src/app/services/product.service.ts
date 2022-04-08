import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Product } from '../models/product';
import {BASE_API_URL} from "../config/api.constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private httpClient: HttpClient) { }

  products$ = this.getAllProducts().pipe(shareReplay(1));
  // categories$ = this.httpClient.get<any>(`${BASE_API_URL}/products`).pipe(shareReplay(1));


  getAllProducts() {
    return this.httpClient.get<Product[]>(`${BASE_API_URL}/products`);
  }

  addProduct(product: any) {
    return this.httpClient.post(`${BASE_API_URL}/products`, product);
  }

  getProductById(id: number) {
    return this.products$.pipe(map(product => product.find(b => b.id === id)));
  }

  updateProductDetails(product: any) {
    console.log(product);

    return this.httpClient.put(`${BASE_API_URL}/products`, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${BASE_API_URL}/products/` + id);
  }
}
