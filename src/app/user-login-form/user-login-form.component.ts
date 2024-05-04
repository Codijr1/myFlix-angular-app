import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Component for a user login form, with functionality for logging in and providing feedback.
 *
 * @component UserLoginFormComponent
 * @selector app-user-login-form
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent {
  /**
   * Input data for the login form.
   */
  @Input() loginData = { Username: '', Password: '' };

  /**
   * Constructor for UserLoginFormComponent.
   *
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog containing the form.
   * @param {MatSnackBar} snackBar - Material snackbar for displaying feedback messages.
   * @param {Router} router - Angular router for navigation.
   * @param {AuthService} authService - Service for user authentication.
   */
  constructor(
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * Logs in the user with the provided credentials.
   * On successful login, it closes the dialog, shows a success message, and redirects to the movies page.
   * On failure, it shows an error message in the snackbar.
   */
  login(): void {
    const credentials = {
      Username: this.loginData.Username,
      Password: this.loginData.Password,
    };

    this.authService.loginUser(credentials).subscribe(
      (response) => {
        this.dialogRef.close();

        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']); //redirect to movies page
      },
      (error) => {
        this.snackBar.open(
          'Login failed: ' + (error.error?.message || 'An error occurred'),
          'OK',
          { duration: 2000 }
        );
      }
    );
  }
}
