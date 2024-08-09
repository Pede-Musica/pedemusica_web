import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  constructor(private http: HttpClient) { }

  public detail(id: string): Observable<any> {
    return this.http.get(`volume/detail/${id}`);
  }

  public transform(data: any): Observable<any> {
    return this.http.post(`volume/transform`, data);
  }
}
