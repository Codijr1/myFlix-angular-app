import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  private userProfileSubject = new BehaviorSubject<any>({}); // BehaviorSubject to manage user data

  constructor(private http: HttpClient) {
    // Load initial user data from local storage
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.userProfileSubject.next(JSON.parse(storedUser));
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserProfileObservable(): Observable<any> {
    return this.userProfileSubject.asObservable(); // Observe changes in user data
  }

  setUserProfile(userProfile: any): void {
    this.userProfileSubject.next(userProfile); // Emit new user data
    localStorage.setItem('userData', JSON.stringify(userProfile)); // Store updated data
  }

  // User registration
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails).pipe(
      catchError(this.handleError),
    );
  }

  // User login
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token); // Store JWT
        }
        this.setUserProfile(response.user); // Update BehaviorSubject with new user data
        return response;
      }),
      catchError(this.handleError),
    );
  }

  // Fetch all movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError),
    );
  }

  // Fetch user profile
  getUserProfile(username: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Obtain authorization headers
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers }).pipe(
      map((response) => {
        this.setUserProfile(response); // Emit updated user data
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user profile:', error);
        return throwError('Failed to fetch user profile');
      }),
    );
  }

  // Add a movie to the user's favorites
  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Obtain authorization headers
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {}, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser); // Emit updated user data after adding a favorite
        return updatedUser;
      }),
      catchError(this.handleError),
    );
  }

  // Remove a movie from the user's favorites
  removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const headers = this.getAuthHeaders(); // Obtain authorization headers
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser); // Emit updated user data after removing a favorite
        return updatedUser;
      }),
      catchError(this.handleError),
    );
  }

  // Update user profile information
  updateUserProfile(username: string, userProfileUpdates: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Obtain authorization headers
    return this.http.put(`${this.apiUrl}/users/${username}`, userProfileUpdates, { headers }).pipe(
      map((updatedUser) => {
        this.setUserProfile(updatedUser); // Emit updated user data after updating
        return updatedUser;
      }),
      catchError(this.handleError), // Handle errors
    );
  }


  //errors
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`HTTP status code: ${error.status}. Body: ${error.error}`);
    }
    return throwError('An error occurred; please try again later.');
  }
}