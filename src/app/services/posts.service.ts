import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  // environment.apiUrl = 'https://blogify-server-nine.vercel.app';

  private getAuthToken(): string | null {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user)?.token : null;
    return token;
  }

  getPosts(search: string): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.get(`${environment.apiUrl}/posts?search=${search}`, {
      headers,
    });
  }

  getPostByPostId(id: string): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.get(`${environment.apiUrl}/posts/${id}`, { headers });
  }

  getPostByUserId(id: string): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.get(`${environment.apiUrl}/posts/userId/${id}`, {
      headers,
    });
  }

  uploadFile(formData: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/upload`, formData, {
      headers,
    });
  }

  publish(postData: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/posts`, postData, { headers });
  }

  deletePost(postId: string): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.delete(`${environment.apiUrl}/posts/${postId}`, {
      headers,
    });
  }

  editPost(postData: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts`, postData, { headers });
  }

  updateViews(postData: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts/updateviews`, postData, {
      headers,
    });
  }

  comment(postData: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts/comment`, postData, {
      headers,
    });
  }

  getComments(userId: string): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.get(`${environment.apiUrl}/posts/getcomments/${userId}`, {
      headers,
    });
  }

  approveComment(data: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts/approve/comment`, data, {
      headers,
    });
  }

  deleteComment(data: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts/delete/comment`, data, {
      headers,
    });
  }

  reply(data: any): Observable<any> {
    let token = this.getAuthToken();
    let headers = token
      ? { Authorization: `Bearer ${token}` }
      : new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/posts/reply`, data, {
      headers,
    });
  }
}
