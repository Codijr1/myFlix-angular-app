import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service'; // The new AuthStateService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  hasToken = false;

  constructor(private router: Router, private authStateService: AuthStateService) { } // Inject AuthStateService

  ngOnInit(): void {
    this.authStateService.loggedIn$.subscribe((isLoggedIn) => {
      this.hasToken = isLoggedIn;
    });
  }

  onLogout(): void {
    localStorage.removeItem('jwtToken'); // Remove JWT
    this.authStateService.setLoggedIn(false); // Update the state
    this.router.navigate(['welcome']); // Navigate to welcome
  }
}
