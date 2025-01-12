import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:8081/api/auth/profile';  // Backend profile endpoint

  constructor(private http: HttpClient) {}

  // Method to get user profile
  getUserProfile(token: string): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: {
        'Authorization': `Bearer ${token}`  // Attach token to the Authorization header
      }
    });
  }
}
