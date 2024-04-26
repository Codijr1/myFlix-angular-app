import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authService: AuthService) { }

  onLogout(): void {
    this.authService.logout(); // Handle logout, remove JWT, redirect to login
    this.router.navigate(['welcome']); // Navigate to the welcome page after logout
  }
}
