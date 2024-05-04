import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.css'],
})
export class UpdateProfileModalComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  currentUserSubscription: Subscription | undefined;
  currentUser: any;

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

  ngOnInit(): void {
    this.currentUserSubscription = this.fetchApiData.getUserProfileObservable().subscribe((user) => {
      this.currentUser = user;
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      const formValues = this.profileForm.value;
      const username = this.currentUser.Username;

      this.fetchApiData.updateUserProfile(username, formValues).subscribe(
        (updatedUser) => {
          console.log('User profile updated:', updatedUser);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
