import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // User object
  favoriteMovies: any[] = []; // Initialize empty array for favorites

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData'); // Retrieve user data from local storage

    if (userData) {
      this.user = JSON.parse(userData); // Parse the stored data

      // Fetch all movies and then match with favorite movie IDs
      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.favoriteMovies = this.user.favoriteMovies.map((movieId: string) =>
          movies.find((m) => m._id === movieId)
        ).filter(Boolean);
      });
    }
  }
}
