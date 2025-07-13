import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  backend_url = 'http://localhost:3000/api/v1'

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.backend_url}/auth/login`, loginData)
  }

  signup(signupData: any): Observable<any> {
    return this.http.post(`${this.backend_url}/auth/signup`, signupData)
  }
}
