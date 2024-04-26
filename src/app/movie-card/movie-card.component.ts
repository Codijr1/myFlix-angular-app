import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movieData: any; // Data for the movie cardselector: 'app-movie-card

  constructor(
    private router: Router,
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  onViewDetails(): void {
    const dialogRef = this.dialog.open(MovieModalComponent, {
      data: { movieData: this.movieData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The modal was closed');
    });
  }

  onAddToFavorites(): void {
    // Check if the movie is already in favorites
    const storedUser = localStorage.getItem('userData');
    let isAlreadyFavorite = false;

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // If the movie ID is in the user's favoriteMovies array
      isAlreadyFavorite = user.favoriteMovies.includes(this.movieData._id);
    }

    if (isAlreadyFavorite) {
      this.snackBar.open('Movie is already in favorites', 'Close', { duration: 3000 });
      return; // Exit early if the movie is already a favorite
    }

    // Add the movie to favorites if it's not already there
    this.fetchApiData.addMovieToFavorites('Username', this.movieData._id).subscribe({
      next: (updatedUser) => {
        this.snackBar.open('Added to favorites', 'Close', { duration: 3000 });

        // Update the user data in local storage
        localStorage.setItem('userData', JSON.stringify(updatedUser));
      },
      error: (error) => {
        console.error('Error adding to favorites:', error);
        this.snackBar.open('Error adding to favorites', 'Close', { duration: 3000 });
      },
    });
  }


  onRemoveFromFavorites(): void {
    const username = this.getUsernameFromStorage();

    if (username) {
      this.fetchApiData.removeMovieFromFavorites(username, this.movieData._id).subscribe({
        next: () => {
          this.snackBar.open('Removed from favorites', 'Close', { duration: 3000 });
          this.updateUserFavorites(false); // Update user data to remove the favorite
        },
        error: (error) => {
          console.error('Error removing from favorites:', error);
          this.snackBar.open('Error removing from favorites', 'Close', { duration: 3000 });
        },
      });
    }
  }

  private updateUserFavorites(add: boolean): void {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (add) {
        user.favoriteMovies.push(this.movieData._id); // Add the movie to favorites
      } else {
        user.favoriteMovies = user.favoriteMovies.filter(
          (movieId: string) => movieId !== this.movieData._id
        ); // Remove from favorites
      }

      localStorage.setItem('userData', JSON.stringify(user)); // Store updated user data
    }
  }

  private getUsernameFromStorage(): string | null {
    const storedUser = localStorage.getItem('userData');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.Username;
    }

    return null;
  }
}
