import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Store the user state
  public user$: Observable<any> = this.userSubject.asObservable(); // Observable to watch for changes

  constructor() { }

  // Method to set the current user
  setUser(user: any): void {
    this.userSubject.next(user); // Update the BehaviorSubject with new user data
  }

  // Method to get the current user
  getUser(): any {
    return this.userSubject.getValue(); // Get the current user state
  }

  // Method to clear user data (e.g., on logout)
  clearUser(): void {
    this.userSubject.next(null);
  }
}
