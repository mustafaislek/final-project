import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../models/product';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  userData = new BehaviorSubject<User>(new User('','','',''));
  searchItemValue$ = new BehaviorSubject<string>('');
  cartItemcount$ = new Subject<number>();

}

