import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServices){}

  ngOnInit(): void {
    this.initializeLogin();
  }

  initializeLogin(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  handleLogin() {
    if (this.loginForm.valid) {
      const getLoginValues = this.loginForm.getRawValue();
      this.isLoading = true;

      this.authService.login(getLoginValues.email, getLoginValues.password).
      subscribe(()=>{
        this.isLoading = false;
        this.router.navigate(['/home'])
      },
      error => {
        this.isLoading = false;
      }
    )
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

  getFormFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Can`t be empty';
    } else if (field?.hasError('email')) {
      return 'Enter a valid email';
    } else if (field?.hasError('minlength')) {
      return `At least 6 characters long`;
    }
    return '';
  }

  navigateToSignup(): void{
    this.router.navigate(['/signup'])
  }
}