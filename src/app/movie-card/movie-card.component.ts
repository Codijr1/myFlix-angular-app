import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() movieData: any;

  constructor(private router: Router) { }

  onViewDetails(): void {
    this.router.navigate(['/movies', this.movieData.title]);
  }
}
