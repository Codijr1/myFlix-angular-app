// FetchApiDataService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://myflixproject-9c1001b14e61.herokuapp.com';

  constructor(private http: HttpClient) { }

  // User registration
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          localStorage.setItem('jwtToken', response.token); // stores JWT token locally
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  getUserProfile(username: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('Token not found');
      return throwError('Authorization token is missing');
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/users/${username}`, { headers }).pipe(
      map((response: any) => {
        console.log('Fetched user profile:', response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching user profile:', error);
        return throwError('Failed to fetch user profile');
      })
    );
  }


  // Error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
