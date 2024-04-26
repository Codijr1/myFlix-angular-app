import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

const dialogConfig = new MatDialogConfig();
dialogConfig.autoFocus = true; // Auto-focus on dialog open
dialogConfig.width = 'auto'; // Allow dialog to adjust
dialogConfig.height = 'auto'; // Auto height based on content

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.css'],
})
export class MovieModalComponent {
  movieData: any; // Store movie data

  constructor(
    public dialogRef: MatDialogRef<MovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data from parent
  ) {
    if (data && data.movieData) {
      this.movieData = data.movieData; // Initialize movie data
    } else {
      console.error('Movie data is missing in MovieModalComponent'); // Log an error
    }
  }

  close(): void {
    this.dialogRef.close(); // Close the modal
  }
}
