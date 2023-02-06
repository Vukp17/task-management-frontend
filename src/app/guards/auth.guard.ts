import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
          return true;
        }
        return false;
      })
    );
  }
}

