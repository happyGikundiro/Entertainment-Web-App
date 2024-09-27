import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.services';
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup;
  user: User = {
    email:'',
    username: '',
    password: ''
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServices){}

  ngOnInit(): void {
    this.initializeSignup();
  }

  initializeSignup(){
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatpassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password');
    const repeatPassword = form.get('repeatpassword');

    if (password?.value !== repeatPassword?.value) {
      repeatPassword?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      return null;
    }
  }

  handleSignup() {
    if (this.signupForm.valid) {
      const getSignupValues = this.signupForm.getRawValue();
      this.authService.register(getSignupValues.email, getSignupValues.username, getSignupValues.password).
      subscribe((response) => {
        if (response.success) {
          this.router.navigate(['']);
        }
      });
    }else{
      this.signupForm.markAllAsTouched();
    }
  }

  getFormFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Can`t be empty';
    } else if (field?.hasError('email')) {
      return 'Enter a valid email';
    } else if (field?.hasError('minlength')) {
      return `At least 6 characters long`;
    }else if (fieldName === 'repeatpassword' && this.signupForm.hasError('mismatch')) {
      return 'Passwords must match';
    }
    return '';
  }

  navigateToLogin(): void{
    this.router.navigate([''])
  }
}