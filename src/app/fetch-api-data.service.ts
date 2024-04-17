import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'api link which I need to find';

  constructor(private http: HttpClient) { }

  //user registration
  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //user login
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError(this.handleError)
    );
  }

  //gt all movies
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`).pipe(
      catchError(this.handleError)
    );
  }

  //get one movie by title
  getMovieByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  //get director by name
  getDirectorByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  //get genre by name
  getGenreByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  //get user by username
  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  //get favorite movies for a user
  getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/movies`).pipe(
      catchError(this.handleError)
    );
  }

  //add a movie to favorite movies
  addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  //edit user data
  editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //delete user
  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`).pipe(
      catchError(this.handleError)
    );
  }

  //delete a movie from favorite movies
  deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`).pipe(
      catchError(this.handleError)
    );
  }

  //error handling
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
