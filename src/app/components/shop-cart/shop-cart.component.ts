import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ShopCart} from 'src/app/models/shopcart';
import {CartService} from 'src/app/services/cart.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {SubscriptionService} from 'src/app/services/subscription.service';
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {
  cartItems: ShopCart[] | any;
  userId: any;
  totalPrice: number | any;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean | undefined;

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService,
    private productService: ProductService
  ) {
    this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    this.cartService.getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          console.log('getCartItems result', result);
          const cartItems = result;
          if (result.length > 0) {
            this.productService.getAllProducts()
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe(
                (products: any) => {
                  console.log('getProductById result', products);

                  this.cartItems = cartItems.map((cartItem: any) => {
                    const product = products.find((product: any) => product.id === cartItem.product.id);
                    return {
                      product,
                      id: cartItem.id,
                      quantity: cartItem.quantity
                    };
                  });
                  this.isLoading = false;

                 // const newCartItems = this.cartItems.filter((item: any, index: any) => index !== this.cartItems.product.indexOf(item));
                  const newCartItems = Array.from(new Set(this.cartItems));

                 console.log('newCartItems', newCartItems);
                  this.cartItems = newCartItems;
                  console.log('cartItems-->', this.cartItems);
                  this.getTotalPrice();

                },
                (error: any) => {
                  console.log('getProductById error', error);
                  this.isLoading = false;
                }
              );
          }
          else {
            this.cartItems = result;
            this.isLoading = false;
          }

        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });

  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach((item: { product: { price: number; }; quantity: number; }) => {
      this.totalPrice += (item.product.price * item.quantity);
      console.log('totalPrice', this.totalPrice);
    });
  }

  deleteCartItem(productId: number) {
    console.log('productId', productId);
    this.cartService.removeCartItems(productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Product removed from cart');
          this.getShoppingCartItems();
        }, (error: any) => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  addToCart(productId: number) {
    this.cartService.addProductToCart(this.userId, productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item added to cart');
          this.getShoppingCartItems();
        }, (error: any) => {
          console.log('Error ocurred while addToCart data : ', error);
        });
  }

  deleteOneCartItem(productId: number) {
    this.cartService.deleteOneCartItem(this.userId, productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('One item removed from cart');
          this.getShoppingCartItems();
        }, (error: any) => {
          console.log('Error ocurred while fetching product data : ', error);
        });
  }

  clearCart() {
    this.cartService.clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar('Cart cleared!!!');
          this.getShoppingCartItems();
        }, (error: any) => {
          console.log('Error ocurred while deleting cart item : ', error);
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
