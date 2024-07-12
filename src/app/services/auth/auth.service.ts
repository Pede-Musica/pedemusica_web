import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login(data: any): Observable<any> {
    return this.http.post(`user/auth`, data);
  }

  public clearAuthData(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('expires_in');

    this.router.navigate(['auth/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
