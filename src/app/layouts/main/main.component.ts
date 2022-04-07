import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // isLoading!: boolean;
  category: any;
  products: any;
  isListView: boolean = false
  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {
   }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data
    })

  }

  changeView(data: any) {
    if (data === 'card') {
      this.isListView = false
    } else if( data === 'list') {
      this.isListView = true
    }
    console.log('changeView', this.isListView);

  }

}
