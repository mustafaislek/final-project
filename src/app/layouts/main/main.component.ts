import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // isLoading!: boolean;
  products: any;
  isListView: boolean = false
  constructor() { }

  ngOnInit(): void {
    // this.isLoading = true;

    this.products = [
      {
        "productId": 1,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "price": "100"
      },
      {
        "productId": 2,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/771796",
        "price": "420"
      },
      {
        "productId": 3,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/24f355",
        "price": "789"
      },
      {
        "productId": 4,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "price": "100"
      },
      {
        "productId": 5,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/771796",
        "price": "420"
      },
      {
        "productId": 6,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/24f355",
        "price": "789"
      },
      {
        "productId": 7,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "price": "100"
      },
      {
        "productId": 8,
        "title": "title 1",
        "description": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/771796",
        "price": "420"
      }
  ]
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
