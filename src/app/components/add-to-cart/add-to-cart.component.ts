import {Component, Input, OnInit} from '@angular/core';
import {CartService} from 'src/app/services/cart.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {SubscriptionService} from 'src/app/services/subscription.service';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Input()
  productId!: number;
  userId: any;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('user_id');
  }

  ngOnInit() {

  }

  addToCart() {
    this.cartService.addProductToCart(this.userId, this.productId).subscribe(
      result => {
        // console.log('addProductToCartresult', result);
        if (result) {
          this.userService.getCartItemCount(this.userId).subscribe(
            res => {
              console.log('res', res, typeof res);
              this.subscriptionService.cartItemcount$.next(res);
            }
          );
        }
        this.snackBarService.showSnackBar('Product added to cart');
      }, error => {
        console.log('Error ocurred while addToCart data : ', error);
      });
  }

}
