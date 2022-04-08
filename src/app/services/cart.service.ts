import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, shareReplay} from 'rxjs/operators';
import {ShopCart} from '../models/shopcart';
import {Observable} from 'rxjs';
import {BASE_API_URL} from "../config/api.constants";
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCount = 0;
  baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = `${BASE_API_URL}/shopCart`;
  }

  shopCartItems$ = this.getAllShopCartItems().pipe(shareReplay(5));

  getAllShopCartItems() {
    return this.httpClient.get<any>(`${BASE_API_URL}/shopCart`);
  }

  addProductToCart(userId: number, productId: number): Observable<any> {
    return this.httpClient.post<number>(this.baseURL, {
      product: {
        userId: userId,
        id: productId,
      },
      quantity: 1
    });
  }

  getCartItems(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${BASE_API_URL}/shopCart`).pipe(map(items => items.filter((i:any) => i.product.userId === userId)))
      // .pipe(map((response: any) => {
      //       console.log(response);
      //       // this.cartItemCount = response.length;
      //       return response;
      //     }));

    // return this.httpClient.get(this.baseURL)
    //   .pipe(map((response: any) => {
    //     console.log(response);
    //     this.cartItemCount = response.length;
    //     return response;
    //   }));
  }

  // todo: kontrol et
/*  getCartItems(userId: number) {
    return this.httpClient.get(this.baseURL)
      .pipe(map((response: any) => {
        console.log(response);
        const cartItems = response.filter((item: any) => item.userId === userId);
        console.log('cartItems', cartItems);
        let cartProducts: Product[] = [];
        this.httpClient.get(`${BASE_API_URL}/products`)
          .subscribe((products: any) => {
            console.log('products', products);
            cartItems.forEach((item: any) => {
              const data = products.filter((p: Product) => p.productId === item.productId);
              cartProducts.push(data[0]);
            });
            console.log('cartProducts', cartProducts);

            return cartProducts
          });

        // return this.httpClient.get(`${BASE_API_URL}/products`).pipe(map((res: any) => {
        //   const cartProducts = cartItems.filter((item: any) => item.productId === res.productId);
        //   console.log('cartProducts', cartProducts);
        //   return cartProducts;
        // }));

        this.cartItemCount = response.length;
      }));
  }*/

  removeCartItems(productId: number) {
    return this.httpClient.delete<number>(this.baseURL + `/${productId}`, {});
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
