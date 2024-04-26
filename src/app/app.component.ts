import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myFlix-Angular-client';
  navbarVisible = true; // Property to track if the navbar should be visible

  constructor(
    public dialog: MatDialog,
    private router: Router // Inject the router to track navigation changes
  ) { }

  ngOnInit(): void {
    // Hide the navbar on specific routes
    const navbarHiddenRoutes = ['/welcome']; // Define routes to hide the navbar

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navbarVisible = !navbarHiddenRoutes.includes(this.router.url);
      }
    });
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
