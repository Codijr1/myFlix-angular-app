import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for the user registration form, used to register new users.
 * 
 * @component UserRegistrationFormComponent
 * @implements OnInit
 * @selector app-user-registration-form
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})

export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for the registration form.
   */
  @Input() userData = { FirstName: '', LastName: '', Username: '', Password: '', Email: '' };

  /**
   * Constructor for UserRegistrationFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - Service for API interactions.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog.
   * @param {MatSnackBar} snackBar - Snackbar for displaying messages to the user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
 * Angular lifecycle hook for initialization. Currently, does not perform any specific actions.
 */
  ngOnInit(): void { }

  /** Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000
        });
      },
      (error) => {
        this.snackBar.open('User registration failed', 'OK', {
          duration: 2000
        });
      }
    );
  }
}

//<app-user-registration-form></app-user-registration-form>