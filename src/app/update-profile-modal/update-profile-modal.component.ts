import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.css'],
})
export class UpdateProfileModalComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateProfileModalComponent>
  ) {
    this.profileForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Username: ['', [Validators.required, Validators.minLength(5)]],
      Password: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void { }

  // Method to submit the form and update user information
  updateProfile(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const username = 'currentUserName'; // Get current user's username

      this.fetchApiData.updateUserProfile(username, formValues).subscribe(
        (updatedUser) => {
          console.log('User profile updated:', updatedUser);
          this.dialogRef.close(); // Close the modal
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    }
  }

  // Method to close the modal without saving
  close(): void {
    this.dialogRef.close();
  }
}
