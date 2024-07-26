import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`person/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`person/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`person/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`person/update`, data);
  }
}
