import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`user/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`user/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`user/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`user/update`, data);
  }
}
