import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movieData: any;

  constructor(
    private router: Router,
    private fetchApiData: FetchApiDataService, // Service to interact with the backend
    private snackBar: MatSnackBar // For user feedback
  ) { }

  // Method to add a movie to the user's favorites
  onAddToFavorites(): void {
    this.fetchApiData.addMovieToFavorites('Username', this.movieData._id).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Added to favorites', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Error adding to favorites', 'Close', { duration: 3000 });
      }
    });
  }

  // Method to remove a movie from the user's favorites
  onRemoveFromFavorites(): void {
    this.fetchApiData.removeMovieFromFavorites('Username', this.movieData._id).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Removed from favorites', 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Error removing from favorites', 'Close', { duration: 3000 });
      }
    });
  }

  // Method to view movie details
  onViewDetails(): void {
    this.router.navigate(['/movies', this.movieData._id]);
  }
}
