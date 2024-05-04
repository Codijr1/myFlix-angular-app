import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Service for interacting with the API, including user authentication, fetching movies, and user profile management.
 * 
 * @service FetchApiDataService
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Base URL for the API.
   */
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  /**
   * BehaviorSubject to manage user profile state.
   */
  private userProfileSubject = new BehaviorSubject<any>({});


  /**
   * Constructor for FetchApiDataService.
   *
   * @param {HttpClient} http - Angular HTTP client for making HTTP requests.
   * @param {MatSnackBar} snackBar - Angular Material Snackbar for user feedback.
   * @param {Router} router - Angular router for navigation.
   */
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.userProfileSubject.next(JSON.parse(storedUser));
    }
  }

  /**
   * Retrieves the authorization headers with the stored JWT token.
   * 
   * @returns {HttpHeaders} The authorization headers with the JWT token.
   */
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
 * Provides an observable to monitor changes in user profile state.
 * 
 * @returns {Observable<any>} An observable for user profile updates.
 */
  getUserProfileObservable(): Observable<any> {
    return this.userProfileSubject.asObservable();
  }

  /**
   * Sets the user profile and updates local storage.
   * 
   * @param {any} userProfile - The updated user profile data.
   */
  setUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile);
    localStorage.setItem('userData', JSON.stringify(userProfile));
  }

  /**
  * Registers a new user with the provided user details.
  *
  * @param {any} userDetails - The user details for registration.
  * @returns {Observable<any>} An observable for the registration response.
  */
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails).pipe(
      catchError(this.handleError),
    );
  }

  /**
   * Logs in a user with the provided credentials.
   *
   * @param {any} credentials - The login credentials (username and password).
   * @returns {Observable<any>} An observable for the login response.
   */
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token); // Store JWT
        }
        this.setUserProfile(response.user);
        return response;
      }),
      catchError(this.handleError),
    );
  }

  /**
    * Fetches all movies from the API.
    *
    * @returns {Observable<any>} An observable with the list of all movies.
    */
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError),
    );
  }

  /**
     * Fetches the user profile for the given username.
     *
     * @param {string} username - The username of the user.
     * @returns {Observable<any>} An observable for the user profile data.
     */
  getUserProfile(username: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers }).pipe(
      map((response) => {
        this.setUserProfile(response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user profile:', error);
        return throwError('Failed to fetch user profile');
      }),
    );
  }

  /**
   * Adds a movie to the user's favorites list.
   *
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to add to favorites.
   * @returns {Observable<any>} An observable with the updated user profile.
   */
  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {}, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser);
        return updatedUser;
      }),
      catchError(this.handleError),
    );
  }

  /**
  * Removes a movie from the user's favorites list.
  *
  * @param {string} username - The username of the user.
  * @param {string} movieId - The ID of the movie to remove from favorites.
  * @returns {Observable<any>} An observable with the updated user profile.
  */
  removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser);
        return updatedUser;
      }),
      catchError(this.handleError),
    );
  }

  /**
   * Updates the user profile with the provided profile updates.
   *
   * @param {string} username - The username of the user.
   * @param {any} userProfileUpdates - The profile updates.
   * @returns {Observable<any>} An observable with the updated user profile.
   */
  updateUserProfile(username: string, userProfileUpdates: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/users/${username}`, userProfileUpdates, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser);
        return updatedUser;
      }),
      catchError(this.handleError),
    );
  }

  /**
 * Deletes the user account for the given username.
 *
 * @param {string} username - The username of the user.
 * @returns {Observable<any>} An observable with the response to the delete request.
 */
  deleteUserAccount(username: string): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.delete(`${this.apiUrl}/users/${username}`, {
      headers,
      observe: 'response',
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(`Error deleting user account: ${error.message}`);
      })
    );
  }



  /**
     * Handles HTTP errors from API requests.
     *
     * @param {HttpErrorResponse} error - The HTTP error response.
     * @returns {Observable<any>} An observable that throws an error message.
     */
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`HTTP status code: ${error.status}. Body: ${error.error}`);
    }
    return throwError('An error occurred; please try again later.');
  }
}