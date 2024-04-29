import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  private tokenKey = 'jwtToken';
  private userKey = 'userData'; // Key for storing user data
  private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject to manage user state

  public user$: Observable<any> = this.userSubject.asObservable(); // Observable for components to subscribe to

  constructor(private http: HttpClient, private router: Router) {
    // Load initial user data from local storage
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); // Set initial user state
    }
  }

  // User login and store JWT token and user data
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token); // Store JWT token
          localStorage.setItem(this.userKey, JSON.stringify(response.user)); // Store user data
          this.userSubject.next(response.user); // Emit user state
          console.log("Logged in user data:", response.user);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed'); // Emit error in case of failure
      })
    );
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  // User logout and clear state
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Clear JWT token
    localStorage.removeItem(this.userKey); // Clear user data from local storage
    this.userSubject.next(null); // Emit null to clear user state
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError('An error occurred, please try again later.');
  }
}