import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  errorMessage: string;
  constructor(private apiService: ApiService, private router: Router) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('token', response.accessToken);
      }),
      catchError(error => {
        if (error.status === 401) {
          // Set the error message
          this.errorMessage = 'Please check your credentials';
          return of(error);
        }
        throw error;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }
  
  
  
}