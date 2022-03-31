import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";


@Injectable(
    { providedIn: 'root'}
)
export class AuthService {
    constructor(
        private router: Router,
        private userService: UserService
    ){}

    signIn(data: any) {
        return this.userService.searchByFormControlKey(data).subscribe ( (res: any) => {
            console.log(res);
        })
    }

    signUp(data: any): Observable<any> {
        return this.userService.saveUser(data)

    }

    logOut() {
        this.router.navigate(['sign-in'])
    }
}
