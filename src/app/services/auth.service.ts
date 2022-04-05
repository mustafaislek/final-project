import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";


@Injectable(
    { providedIn: 'root'}
)
export class AuthService {

  currentUser:any;

    constructor(
        private router: Router,
        private userService: UserService
    ){}

    signIn(signIndata: any) {
        return this.userService.searchByFormControlKey(signIndata).subscribe ( (user: any) => {
          console.log('user', user);
          localStorage.setItem('access_token', user[0].token);
          this.currentUser = user[0];
          localStorage.setItem('userId', user[0].id);

          // this.router.navigate([`user-detail/${this.currentUser.id}`])
        })
    }

    signUp(user: any): Observable<any> {
        return this.userService.saveUser(user)

    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    get isLoggedIn(): boolean {
      let authToken = this.getToken();
      return authToken !== null ? true : false;
    }


    logOut() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['sign-in']);
      }
      localStorage.clear();
    }
}
