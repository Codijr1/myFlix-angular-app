import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthStateService } from '../auth-state.service'; // Inject AuthStateService

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService
  ) { }

  login(): void {
    const credentials = {
      Username: this.loginData.Username,
      Password: this.loginData.Password,
    };

    this.authService.loginUser(credentials).subscribe(
      (response) => {
        localStorage.setItem('jwtToken', response.token); // Store JWT
        this.dialogRef.close();

        // Set login state to true
        this.authStateService.setLoggedIn(true);

        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });

        this.router.navigate(['movies']); // Navigate to movies
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
