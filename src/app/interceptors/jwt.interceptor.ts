import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@app/services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('auth')) {

      return next.handle(request);

    } else {

      return next.handle(request).pipe(catchError(err => {

        if (err instanceof HttpErrorResponse && (err.status === 401 || err.status == 403)) {

          // Token is expired or acess revoked
          this._authService.clearAuthData();

          return next.handle(request);

        } else {
          return throwError(err);
        }

      }));

    }
  }
}
