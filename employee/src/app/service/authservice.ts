import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authservice {
  private apiUrl = 'https://api.freeprojectapi.com/api/UserApp/login';

  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
  
}
