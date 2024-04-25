import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any; // Object to hold user data
  favoriteMovies: any[] = []; // Array to hold favorite movies
  allMovies: any[] = []; // Array for all movies

  constructor(private fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.user = JSON.parse(userData);

      // Fetch all movies to match with favorite movie IDs
      this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
        this.allMovies = movies;

        // Explicitly declare the type for 'movieId' to avoid implicit 'any' error
        this.favoriteMovies = this.user.favoriteMovies.map((movieId: string) =>
          this.allMovies.find((m) => m._id === movieId)
        ).filter(Boolean); // Filter out undefined values
      });
    }
  }
}
