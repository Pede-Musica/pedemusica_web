import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`customer/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`customer/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`customer/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`customer/update`, data);
  }
}
