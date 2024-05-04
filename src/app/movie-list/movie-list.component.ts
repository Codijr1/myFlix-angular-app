//movie-list
import { Component, OnInit, HostListener } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';


/**
 * Component for displaying a list of movies with responsive layout.
 * 
 * @component MovieListComponent
 * @implements OnInit
 * @selector app-movie-list
 */
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  /**
   * List of movies to display.
   */
  movies: any[] = [];
  /**
   * The number of columns for the grid layout.
   */
  breakpoint: number = 4;

  constructor(private fetchApiData: FetchApiDataService, private router: Router) { }
  /**
    * Initialization method. Sets the initial breakpoint and fetches all movies.
    */
  ngOnInit(): void {
    this.breakpoint = this.getBreakpoint(window.innerWidth);

    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
  /**
     * Determines the number of columns based on the window width.
     * 
     * @param {number} width - The current window width.
     * @returns {number} The appropriate number of columns for the grid layout.
     */
  getBreakpoint(width: number): number {
    if (width <= 600) {
      return 1;
    } else if (width <= 900) {
      return 2;
    } else {
      return 4;
    }
  }
  /**
     * Updates the grid layout when the window is resized.
     * 
     * @param {Event} event - The window resize event.
     */
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.breakpoint = this.getBreakpoint(event.target.innerWidth);
  }

  /**
   * Navigates to the movie details page for the given movie title.
   * 
   * @param {string} title - The title of the movie to view details for.
   */
  viewMovieDetails(title: string): void {
    this.router.navigate(['/movies', title]);
  }
}
