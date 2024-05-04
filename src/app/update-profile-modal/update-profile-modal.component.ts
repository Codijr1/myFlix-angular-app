import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Subscription } from 'rxjs';

/**
 * Component for a modal dialog to update user profile information.
 * 
 * @component UpdateProfileModalComponent
 * @implements OnInit, OnDestroy
 * @selector app-update-profile-modal
 */
@Component({
  selector: 'app-update-profile-modal',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.css'],
})
export class UpdateProfileModalComponent implements OnInit, OnDestroy {
  /**
   * Reactive form group for the user profile update form.
   */
  profileForm: FormGroup;
  /**
   * Subscription to the user profile observable.
   */
  currentUserSubscription: Subscription | undefined;
  /**
   * The current user data.
   */
  currentUser: any;

  /**
     * Constructor for UpdateProfileModalComponent.
     *
     * @param {FormBuilder} fb - Angular FormBuilder for creating reactive forms.
     * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
     * @param {MatDialogRef<UpdateProfileModalComponent>} dialogRef - Reference to the modal dialog.
     */
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

  /**
  * Angular lifecycle hook for component initialization.
  * Subscribes to the user profile observable to get current user data.
  */
  ngOnInit(): void {
    this.currentUserSubscription = this.fetchApiData.getUserProfileObservable().subscribe((user) => {
      this.currentUser = user;
    });
  }

  /**
   * Updates the user profile with the data from the form.
   * Closes the dialog upon successful update.
   */
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

  /**
   * Closes the modal dialog without updating the profile.
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Angular lifecycle hook for component destruction.
   * Unsubscribes from the user profile observable to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
