import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // User object
  favoriteMovies: any[] = []; // List of favorite movies
  breakpoint: number = 3;

  constructor(
    private fetchApiData: FetchApiDataService,
    private breakpointObserver: BreakpointObserver // For responsive grid
  ) { }

  ngOnInit(): void {
    // Observe the behavior subject for user data updates
    this.fetchApiData.getUserProfileObservable().subscribe((user) => {
      if (user) {
        this.user = user;
        this.loadFavoriteMovies(); // Refresh favorite movies when data changes
      }
    });

    // Adjust breakpoint for responsive design
    this.breakpointObserver.observe(['(max-width: 600px)', '(max-width: 900px)']).subscribe((state) => {
      this.breakpoint = state.breakpoints['(max-width: 600px)'] ? 1 :
        state.breakpoints['(max-width: 900px)'] ? 2 : 3;
    });
  }

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = this.user.favoriteMovies.map((movieId: string) =>
        movies.find((m) => m._id === movieId)
      ).filter(Boolean);
    });
  }
}
