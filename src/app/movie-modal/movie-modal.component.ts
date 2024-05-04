import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

/**
 * Component for displaying a modal with movie details.
 * 
 * @component MovieModalComponent
 * @selector app-movie-modal
 */
@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.css'],
})
export class MovieModalComponent {
  /**
   * Data for the movie to be displayed in the modal.
   */
  movieData: any;

  /**
  * Constructor for MovieModalComponent.
  *
  * @param {MatDialogRef<MovieModalComponent>} dialogRef - Reference to the modal dialog.
  * @param {any} data - Data injected into the modal, containing movie details.
  */
  constructor(
    public dialogRef: MatDialogRef<MovieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.movieData) {
      this.movieData = data.movieData;
    } else {
      console.error('Movie data is missing in MovieModalComponent');
    }
  }

  /**
   * Closes the modal dialog.
   */
  close(): void {
    this.dialogRef.close();
  }
}
