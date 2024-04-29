import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileModalComponent } from '../update-profile-modal/update-profile-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // User object
  favoriteMovies: any[] = []; // List of favorite movies
  breakpoint: number = 3;

  constructor(
    private fetchApiData: FetchApiDataService,
    private breakpointObserver: BreakpointObserver, // For responsive grid
    private dialog: MatDialog // For opening modals
  ) { }

  ngOnInit(): void {
    this.fetchApiData.getUserProfileObservable().subscribe((user) => {
      if (user) {
        this.user = user;
        this.loadFavoriteMovies(); // Refresh favorite movies when data changes
      }
    });

    this.breakpointObserver.observe(['(max-width: 600px)', '(max-width: 900px)']).subscribe((state) => {
      this.breakpoint = state.breakpoints['(max-width: 600px)'] ? 1 :
        state.breakpoints['(max-width: 900px)'] ? 2 : 3;
    });
  }

  // Method to open the update profile modal
  openUpdateProfileModal(): void {
    this.dialog.open(UpdateProfileModalComponent);
  }

  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = this.user.favoriteMovies.map((movieId: string) =>
        movies.find((m) => m._id === movieId)
      ).filter(Boolean);
    });
  }
}
