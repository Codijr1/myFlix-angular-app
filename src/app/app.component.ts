import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';


/**
 * Main application component for myFlix-Angular-client.
 * Handles navigation, user registration, and user login dialogs.
 * 
 * @component AppComponent
 * @implements OnInit
 * @selector app-root
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'myFlix-Angular-client';

  /**
  * The current route based on navigation events.
  */
  currentRoute: string = '';

  /**
   * Constructor for AppComponent.
   *
   * @param {Router} router - Angular router for handling navigation.
   * @param {MatDialog} dialog - Angular Material Dialog for opening dialogs.
   */
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  /**
   * Angular lifecycle hook for component initialization.
   * Listens for navigation events and updates the current route.
   */
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  /**
   * Checks if the current route is the welcome page.
   * 
   * @returns {boolean} True if the current route is the welcome page, otherwise false.
   */
  isWelcomePage(): boolean {
    return this.currentRoute === '/welcome' || this.currentRoute === '/';
  }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
