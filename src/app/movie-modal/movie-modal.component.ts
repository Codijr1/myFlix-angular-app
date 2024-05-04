import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.css'],
})
export class MovieModalComponent {
  movieData: any;

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

  close(): void {
    this.dialogRef.close();
  }
}
