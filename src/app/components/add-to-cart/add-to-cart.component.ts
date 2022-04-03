import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

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
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = localStorage.getItem('userId');
}
  ngOnInit() {


  }
  addToCart() {

    this.cartService.addProductToCart(this.userId, this.productId).subscribe(
      result => {
        this.subscriptionService.cartItemcount$.next(result);
        this.snackBarService.showSnackBar('One Item added to cart');
      }, error => {
        console.log('Error ocurred while addToCart data : ', error);
      });
  }

}
