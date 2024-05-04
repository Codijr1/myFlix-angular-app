import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateProfileModalComponent } from '../update-profile-modal/update-profile-modal.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

/**
 * Component for displaying and managing user profiles, including updating profile,
 * managing favorite movies, and deleting user accounts.
 * 
 * @component UserProfileComponent
 * @implements OnInit
 * @selector app-user-profile
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  /**
  * User data.
  */
  user: any = {};
  /**
   * List of the user's favorite movies.
   */
  favoriteMovies: any[] = [];
  /**
   * Number of columns in the grid layout, depending on the screen size.
   */
  breakpoint: number = 3;

  constructor(
    private fetchApiData: FetchApiDataService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook for component initialization.
   * Loads the user profile and favorite movies, and sets the grid layout based on screen size.
   */
  ngOnInit(): void {
    this.fetchApiData.getUserProfileObservable().subscribe((user) => {
      if (user) {
        this.user = user;
        this.loadFavoriteMovies();
      }
    });

    this.breakpointObserver.observe(['(max-width: 600px)', '(max-width: 900px)']).subscribe((state) => {
      this.breakpoint = state.breakpoints['(max-width: 600px)'] ? 1 :
        state.breakpoints['(max-width: 900px)'] ? 2 : 3;
    });
  }

  /**
   * Opens a modal to update the user profile.
   */
  openUpdateProfileModal(): void {
    this.dialog.open(UpdateProfileModalComponent);
  }

  /**
   * Opens a dialog to confirm account deletion.
   * If the dialog is confirmed, the user account is deleted.
   */
  openDeleteAccountDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteUserAccount();
      }
    });
  }

  /**
   * Loads the user's favorite movies from the list of all movies.
   */
  loadFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.favoriteMovies = this.user.favoriteMovies.map((movieId: string) =>
        movies.find((m) => m._id === movieId)
      ).filter(Boolean);
    });
  }

  /**
   * Deletes the user account.
   * Shows a confirmation message upon successful deletion and redirects to the welcome page.
   * If the deletion fails, displays an error message.
   */
  deleteUserAccount(): void {
    const username = this.user.Username;
    this.fetchApiData.deleteUserAccount(username).subscribe(
      (response) => {
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 3000,
        });

        this.router.navigate(['/welcome']);
      },
      (error) => {
        this.snackBar.open(`Error deleting account: ${error.message}`, 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
