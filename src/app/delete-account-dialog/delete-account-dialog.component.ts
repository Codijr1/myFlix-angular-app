import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Component for a dialog that confirms or cancels account deletion.
 * 
 * @component DeleteAccountDialogComponent
 * @selector app-delete-account-dialog
 */
@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
})

/**
  * Constructor for DeleteAccountDialogComponent.
  * 
  * @param {MatDialogRef<DeleteAccountDialogComponent>} dialogRef - Reference to the dialog used to close it.
  */
export class DeleteAccountDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>) { }
  /**
    * Confirm account deletion and close the dialog with a positive response.
    */
  confirmDelete(): void {
    this.dialogRef.close(true);
  }
  /**
     * Cancel account deletion and close the dialog with a negative response.
     */
  cancelDelete(): void {
    this.dialogRef.close(false);
  }
}
