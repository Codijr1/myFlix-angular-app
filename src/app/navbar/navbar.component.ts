import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Component for the navigation bar, providing logout functionality and navigation.
 *
 * @component NavbarComponent
 * @selector app-navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
/**
  * Constructor for NavbarComponent.
  *
  * @param {Router} router - Angular Router for navigation.
  * @param {AuthService} authService - Service for user authentication and logout.
  */
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }

  /**
   * Logs out the current user and navigates to the welcome page.
   */
  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['welcome']);
  }
}
