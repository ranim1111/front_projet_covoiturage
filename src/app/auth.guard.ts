import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isAuthenticated = this.checkAuthentication();

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login-page']);
      return false;
    }
  }

  private checkAuthentication(): boolean {
    const token = localStorage.getItem('authToken');
    return token ? true : false;  
  }
}
