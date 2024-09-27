import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";
import { from, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthServices{
    firebaseAuth = inject(Auth);
    toastr = inject(ToastrService);

    register(email: string, username: string, password: string): Observable<{ success: boolean }>{
        const result = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password,
        ).then(async (result) => {
          await updateProfile(result.user, { displayName: username });
            this.toastr.success('Registration Successful');
            return { success: true }; 
        }).catch(error => {
          this.toastr.error(error.message, 'Registration Error');
          return { success: false };
        });

        return from(result);
    }

    login(email: string, password: string): Observable<void>{
        const result = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {
          this.toastr.success('Login Successful');
        }).catch(error => {
          this.toastr.error(error.message, 'Login Error');
        });

        return from(result);
    }

    logout(): Observable<void> {
        const result = signOut(this.firebaseAuth).then(() => {
          this.toastr.success('Logout Successful');
        }).catch(error => {
          this.toastr.error(error.message, 'Logout Error');
        });
  
        return from(result);
      }
}