import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) { }
  backend_url = 'http://localhost:3000/api/v1';

  private getAuthToken(): string | null {
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user)?.token : null;
    return token;
  }

  getPosts(search: string): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.get(`${this.backend_url}/posts?search=${search}`, { headers })
  }

  getPostByPostId(id: string): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.get(`${this.backend_url}/posts/${id}`, { headers })
  }

  getPostByUserId(id: string): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.get(`${this.backend_url}/posts/userId/${id}`, { headers })
  }

  uploadFile(formData: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.post(`${this.backend_url}/upload`, formData, { headers })
  }

  publish(postData: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.post(`${this.backend_url}/posts`, postData, { headers })
  }

  deletePost(postId: string): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.delete(`${this.backend_url}/posts/${postId}`, { headers })
  }

  editPost(postData: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts`, postData, { headers })
  }

  updateViews(postData: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts/updateviews`, postData, { headers })
  }

  comment(postData: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts/comment`, postData, { headers })
  }

  getComments(userId: string): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.get(`${this.backend_url}/posts/getcomments/${userId}`, { headers })
  }

  approveComment(data: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts/approve/comment`, data, { headers })
  }

  deleteComment(data: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts/delete/comment`, data, { headers })
  }

  reply(data: any): Observable<any> {
    let token = this.getAuthToken()
    let headers = token ? { 'Authorization': `Bearer ${token}` } : new HttpHeaders();
    return this.http.put(`${this.backend_url}/posts/reply`, data, { headers })
  }

}
