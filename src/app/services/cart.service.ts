import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ShopCart } from '../models/shopcart';
import { Observable } from 'rxjs';
import {BASE_API_URL} from "../config/api.constants";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCount = 0;
  baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = `${{BASE_API_URL}}/ShopCart/`;
  }

  addProductToCart(userId: number, productId: number): Observable<any> {
    return this.httpClient.post<number>(this.baseURL + `addToCart/${userId}/${productId}`, {});
  }

  getCartItems(userId: number) {
    return this.httpClient.get(this.baseURL + userId)
      .pipe(map((response: any) => {
        this.cartItemCount = response.length;
        return response;
      }));
  }

  removeCartItems(userId: number, productId: number) {
    return this.httpClient.delete<number>(this.baseURL + `${userId}/${productId}`, {});
  }

  deleteOneCartItem(userId: number, productId: number) {
    return this.httpClient.put<number>(this.baseURL + `${userId}/${productId}`, {});
  }

  clearCart(userId: number) {
    return this.httpClient.delete<number>(this.baseURL + `${userId}`, {});
  }

  setCart(oldUserId: number, newUserId: number) {
    return this.httpClient.get(this.baseURL + `setShopCart/${oldUserId}/${newUserId}`, {})
      .pipe(map((response: any) => {
        this.cartItemCount = response;
        return response;
      }));
  }
}
