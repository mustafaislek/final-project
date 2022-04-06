import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  showPassword: boolean = true;

  unsubscribeAll = new Subject<void>();

  constructor(
   public fb: FormBuilder,
   public router: Router,
   public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  createSignInForm(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password:['', Validators.required]
    })
  }

  loginUser() {
    if (this.signinForm.valid) {
      this.authService.signIn(this.signinForm.value)

    // .pipe(takeUntil(this.unsubscribeAll)).subscribe( (data: any) => {
    //   this.signinForm.reset();
    //   this.signinForm.setErrors({
    //     invalidLogin:true
    //   });

    // })
    this.router.navigate([''])
    }
  }

  canExit():boolean {
    if (this.signinForm.dirty && !this.signinForm.pristine) {
      if (confirm('Do you wish?')) {
          return true
      }
      return false
    }
    return false
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
