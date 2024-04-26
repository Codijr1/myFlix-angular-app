import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css'],
})
export class UserLoginFormComponent {
  @Input() loginData = { Username: '', Password: '' }; // Credentials for login

  constructor(
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService // Use AuthService for authentication
  ) { }

  login(): void {
    const credentials = {
      Username: this.loginData.Username,
      Password: this.loginData.Password,
    };

    this.authService.loginUser(credentials).subscribe(
      (response) => {
        // Close the dialog and navigate to movies on successful login
        this.dialogRef.close();

        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']); // Redirect to movies page
      },
      (error) => {
        // Handle login errors
        this.snackBar.open(
          'Login failed: ' + (error.error?.message || 'An error occurred'),
          'OK',
          { duration: 2000 }
        );
      }
    );
  }
}
