import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { UserType } from 'src/app/models/usertype';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    userId: any;
    userDataSubscription: any;
    userData = new User('','','','');
    userType = UserType;
    cartItemCount$!: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public userService: UserService,
    private subscriptionService: SubscriptionService,
    ) {
    this.userId = localStorage.getItem('user_id');
      this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
        this.subscriptionService.cartItemcount$.next(data);
      });
    }

    ngOnInit() {

      this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
        this.userData = data;
      });

      this.cartItemCount$ = this.subscriptionService.cartItemcount$;
    }

    ngOnDestroy() {
      if (this.userDataSubscription) {
        this.userDataSubscription.unsubscribe();
      }
    }

  logout() {
    this.authService.logOut()
  }
}
