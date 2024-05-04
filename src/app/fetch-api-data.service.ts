import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';
  private userProfileSubject = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
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
    this.userProfileSubject.next(userProfile);
    localStorage.setItem('userData', JSON.stringify(userProfile));
  }

  //user registration
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails).pipe(
      catchError(this.handleError),
    );
  }

  //user login
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

  //fetch all movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError),
    );
  }

  //fetch user profile
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

  //add a movie to the user's favorites
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

  //remove a movie from the user's favorites
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

  //update user profile information
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

  //function to delete a user by username
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