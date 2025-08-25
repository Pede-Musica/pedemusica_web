import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  public sendRequest(data: any): Observable<any> {
    return this.http.post(`request/create`, data);
  }

  public paginate(params: any): Observable<any> {
    return this.http.get(`request/paginate`, { params });
  }

  public update(data: any): Observable<any> {
    return this.http.post(`request/update`, data);
  }

}
