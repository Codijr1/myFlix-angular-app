// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private router: Router) { }

  // Login user and store the token
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token); // Store JWT token
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  // Check if user is logged in (by checking if token is stored)
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  // Log out the user by removing the token
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Clear JWT token
    this.router.navigate(['/login']); // Redirect to login page or home
  }
}
