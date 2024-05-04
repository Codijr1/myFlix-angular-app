import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * Component for the welcome page, providing options to register, log in, or view movies.
 * 
 * @component WelcomePageComponent
 * @implements OnInit
 * @selector app-welcome-page
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  /**
  * Constructor for WelcomePageComponent.
  *
  * @param {MatDialog} dialog - Angular Material Dialog service for opening dialogs.
  */
  constructor(public dialog: MatDialog) { }

  /**
  * Angular lifecycle hook for initialization.
  * Currently, does not perform any specific actions on initialization.
  */
  ngOnInit(): void {
  }

  /**
  * Opens the user registration dialog.
  */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the movie card dialog.
   */
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '280px'
    });
  }
}