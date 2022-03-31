import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;

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

  loginUser(): void {
    this.authService.signIn(this.signinForm.value)
  }
 
}
