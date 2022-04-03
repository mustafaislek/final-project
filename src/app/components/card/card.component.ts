import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  product: any;

  isActive = false;
  // userData$: Observable<User>;

  // constructor(private router: Router, private subscriptionService: SubscriptionService) { }
  constructor(private router: Router,
   public authService: AuthService) { }

  ngOnInit() {
    // this.userData$ = this.subscriptionService.userData;
  }

  goToPage(id: number) {
    this.router.navigate(['/products/details/', id]);
  }

}
