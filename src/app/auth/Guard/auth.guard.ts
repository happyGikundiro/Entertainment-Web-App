import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  firebaseAuth = inject(Auth);
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return user(this.firebaseAuth).pipe(
      map((authUser) => {
        if (authUser) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      })
    );
  }
}