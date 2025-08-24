import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { catchError, EMPTY, filter, finalize, take, tap } from 'rxjs';

import { customEmailValidator } from '@shared/validators/customEmailValidator';
import { passwordStrengthValidator } from '@shared/validators/passwordStrengthValidator';

import { ApiHttpService } from '@shared/services/api-http.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loading = false;
  loginForm: FormGroup;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private apiHttpService: ApiHttpService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: [String.Empty, [Validators.required, customEmailValidator()]],
      password: [String.Empty, [Validators.required]],
    });
  }

  onSubmitForm() {
    this.loading = true;
    // this.requestLogin(this.loginForm.value);
  }

  // requestLogin(payload: LoginPayload) {
  //   this.apiHttpService.login(payload).pipe(
  //     take(1),
  //     filter((res)=> !!res),
  //     tap((res)=>{
  //       localStorage.setItem("access_token", res?.token);
  //       this.router.navigate(['/'])
  //       window.alert(res?.message);
  //     }),
  //     catchError((err)=>{
  //       const {error} = err;
  //       window.alert(error?.message);
  //       return EMPTY;
  //     }),
  //     finalize(()=> this.loading = false)
  //   ).subscribe()
  // }

  onSignupButtonClick() {
    this.router.navigate(['/auth/signup']);
  }
}
