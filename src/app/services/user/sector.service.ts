import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  public create(data: any): Observable<any> {
    return this.http.post(`sector/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`sector/paginate`, { params });
  }

  public detail(id: string): Observable<any> {
    return this.http.get(`sector/detail/${id}`);
  }

  public update(data: any): Observable<any> {
    return this.http.post(`sector/update`, data);
  }

  public combolist(): Observable<any> {
    return this.http.get(`sector/combolist`);
  }
}
