import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`producer/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`producer/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`producer/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`producer/update`, data);
  }
}
