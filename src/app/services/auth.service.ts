import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  backend_url = 'https://blogify-server-nine.vercel.app';

  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, loginData);
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/signup`, signupData);
  }
}
