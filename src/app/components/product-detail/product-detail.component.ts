import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: any;
  // productDetails$: Observable<Product> | undefined;
  productDetails: any;
  userData$: Observable<User> | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.route.params.subscribe((params:any) => {
        this.productId = +params.id;
        this.getProductDetails();
      }
    );
    this.userData$ = this.subscriptionService.userData;
  }

  getProductDetails() {
     this.productService.getProductById(this.productId).subscribe( data => {
      this.productDetails = data
   })
  }

}
