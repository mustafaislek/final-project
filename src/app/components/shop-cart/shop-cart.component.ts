import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShopCart } from 'src/app/models/shopcart';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

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
    private subscriptionService: SubscriptionService
    ) {
    this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    // todo: test, duzeltilecek
    setTimeout(() => {
    this.isLoading = false;
    }, 1000);

    this.cartItems =  [{
      product:{
        productId: 1,
        title: "title 1",
        description: "accusamus beatae ad facilis cum similique qui sunt",
        url: "https://via.placeholder.com/600/92c952",
        price: 100
      },
      quantity: 1
    },
      {
        product:{
          productId: 2,
          title: "title 2",
          description: "2  f cum similique qui sunt",
          url: "https://via.placeholder.com/600/92c952",
          price: 200
        },
        quantity: 1
      }];


    // this.cartService.getCartItems(this.userId)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     (result: any) => {
    //       this.cartItems = result;
    //       // this.getTotalPrice();
    //       this.isLoading = false;
    //     }, error => {
    //       console.log('Error ocurred while fetching shopping cart item : ', error);
    //     });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach((item: { product: { price: number; }; quantity: number; }) => {
      this.totalPrice += (item.product.price * item.quantity);
    });
  }

  deleteCartItem(productId: number) {
    this.cartService.removeCartItems(this.userId, productId)
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
