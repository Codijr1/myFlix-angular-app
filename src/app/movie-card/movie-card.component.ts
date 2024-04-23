import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'], // Add styles for card layout
})
export class MovieCardComponent {
  @Input() movieData: any; // Expects movie data passed from the parent component

  constructor(private router: Router) { }

  onViewDetails(): void { // Action to handle when button is clicked
    this.router.navigate(['/movies', this.movieData.title]);
  }
}
