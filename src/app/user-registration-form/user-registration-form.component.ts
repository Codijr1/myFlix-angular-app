import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { FirstName: '', LastName: '', Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

  }

  /** Function for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error
   */
  registerUser(): void {
    this.fetchApiData.registerUser(this.userData).subscribe(
      (result) => {
        // Logic for a successful user registration goes here (To be implemented)
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