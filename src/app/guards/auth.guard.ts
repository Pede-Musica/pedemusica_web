import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authCheck();
  }

  public canLoad(route: Route): Observable<boolean> | boolean {
    return this.authCheck();
  }

  private authCheck() {

    const status = this._authService.isAuthenticated();

    if (!status) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
