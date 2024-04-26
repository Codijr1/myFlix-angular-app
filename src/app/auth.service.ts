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
  private userSubject = new BehaviorSubject<any>(null); // User state management
  public user$: Observable<any> = this.userSubject.asObservable(); // Observable for real-time updates

  constructor(private http: HttpClient, private router: Router) {
    // Load initial user data from local storage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser)); // Set initial user state
    }
  }

  // User login and store JWT token
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token); // Store JWT token
          this.userSubject.next(response.user); // Set user state
          console.log("Logged in user data:", response.user);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError('Login failed');
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
    this.userSubject.next(null); // Clear user state
    this.router.navigate(['/login']); // Redirect on logout
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    // Custom error handling logic
    return throwError('An error occurred, please try again later.');
  }
}
