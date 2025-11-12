// File: src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  // ✅ متد مورد نیاز برای ShopDetail و Account Page
  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  login(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }
}
