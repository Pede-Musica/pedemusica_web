import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`material/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`material/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`material/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`material/update`, data);
  }

  public combolist(): Observable<any> {
    return this.http.get(`material/combolist`);
  }
}
