//movie-list
import { Component, OnInit, HostListener } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  breakpoint: number = 4; // Default value to ensure initialization

  constructor(private fetchApiData: FetchApiDataService, private router: Router) { }

  ngOnInit(): void {
    // Initialize breakpoint based on window width
    this.breakpoint = this.getBreakpoint(window.innerWidth);

    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  // Function to determine the number of grid columns based on screen width
  getBreakpoint(width: number): number {
    if (width <= 600) {
      return 1; // Narrow screens
    } else if (width <= 900) {
      return 2; // Medium screens
    } else {
      return 4; // Wide screens
    }
  }

  // Adjust breakpoint on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.breakpoint = this.getBreakpoint(event.target.innerWidth);
  }

  // Function to view movie details
  viewMovieDetails(title: string): void {
    this.router.navigate(['/movies', title]);
  }
}
