import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

/**
 * Service for user authentication, providing login, logout, and token management.
 * 
 * @service AuthService
 */
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  /**
  * Base URL for the API.
  */
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  /**
   * Key used for storing the JWT token in local storage.
   */
  private tokenKey = 'jwtToken';
  /**
   * Key used for storing user data in local storage.
   */
  private userKey = 'userData';
  /**
  * BehaviorSubject to track the current user state.
  */
  private userSubject = new BehaviorSubject<any>(null);
  /**
   * Observable to provide user state updates.
   */

  public user$: Observable<any> = this.userSubject.asObservable();

  /**
   * Constructor for AuthService.
   *
   * @param {HttpClient} http - Angular HTTP client for API requests.
   * @param {Router} router - Angular router for navigation.
   */
  constructor(private http: HttpClient, private router: Router) {

    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  /**
     * Logs in a user with the given credentials.
     *
     * @param {Object} credentials - The login credentials (username and password).
     * @returns {Observable<any>} An observable with the login response.
     */
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
          this.userSubject.next(response.user);
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

  /**
    * Checks if the user is logged in by verifying the presence of a JWT token.
    *
    * @returns {boolean} True if the user is logged in, otherwise false.
    */
  isLoggedIn(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }

  /**
   * Logs out the current user, clears tokens and user data from local storage,
   * and navigates to the login page.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
     * Handles HTTP errors for API requests.
     *
     * @param {HttpErrorResponse} error - The HTTP error response.
     * @returns {Observable<any>} An observable that throws an error message.
     */
  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError('An error occurred, please try again later.');
  }
}