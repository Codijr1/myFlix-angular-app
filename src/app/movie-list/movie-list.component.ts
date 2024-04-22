import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }

  // function to view movie details
  viewMovieDetails(title: string): void {
    this.router.navigate(['/movies', title]);
  }
}
